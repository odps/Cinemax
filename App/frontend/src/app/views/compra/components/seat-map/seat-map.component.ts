import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DisponibilidadAsiento } from '../../../../core/interfaces/disponibilidad-asiento';
import { Asiento } from '../../../../core/interfaces/asiento';
import { DispoAsientoService } from '../../../../core/services/dispoAsiento.service';
import { AsientoService } from '../../../../core/services/asiento.service';
import { ReservationTimerPipe } from './reservation-timer.pipe';

// Clase para representar visualmente un asiento en el mapa
export class SeatDisplay {
  fila: string;
  numero: number;
  estado: string = 'disponible';
  asientoId: number;
  disponibilidadId?: number;
  selected: boolean = false;

  constructor(fila: string, numero: number, asientoId: number) {
    this.fila = fila;
    this.numero = numero;
    this.asientoId = asientoId;
  }

  get styleClass(): string {
    if (this.selected) return 'seat seat-selected';
    if (this.estado === 'ocupado') return 'seat seat-occupied';
    if (this.estado === 'reservado') return 'seat seat-reserved';
    return 'seat seat-available';
  }

  get isSelectable(): boolean {
    return this.estado === 'disponible';
  }
}

@Component({
  selector: 'app-seat-map',
  standalone: true,
  imports: [CommonModule, ToastModule, ButtonModule, ReservationTimerPipe],
  providers: [MessageService],
  templateUrl: './seat-map.component.html',
  styleUrls: ['./seat-map.component.css'],
})
export class SeatMapComponent implements OnInit, OnChanges {
  @Input() funcionId: number | null = null;

  @Output() seatSelected = new EventEmitter<DisponibilidadAsiento>();
  @Output() continueToPayment = new EventEmitter<void>();
  @Output() cancelSelection = new EventEmitter<void>();

  rows: string[] = [];
  seatsPerRow: { [key: string]: SeatDisplay[] } = {};

  availabilityData: DisponibilidadAsiento[] = [];
  selectedSeatDisplay: SeatDisplay | null = null;
  selectedAvailability: DisponibilidadAsiento | null = null;

  private reservedDisponibilidadId: number | null = null;

  countdown: number = 0; // segundos
  countdownInterval: any = null;

  loading: boolean = true;
  error: string | null = null;

  constructor(
    private asientoService: AsientoService,
    private dispoAsientoService: DispoAsientoService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    if (this.funcionId) {
      this.loadSeats();
    }
  }

  ngOnChanges(): void {
    if (this.funcionId) {
      this.loadSeats();
    }
  }

  // Carga la disponibilidad de asientos para la función seleccionada
  private loadSeats(): void {
    if (!this.funcionId) return;
    this.loading = true;
    this.error = null;
    this.dispoAsientoService
      .getDisponibilidadesPorFuncionId(this.funcionId)
      .subscribe({
        next: (disponibilidades) => {
          this.availabilityData = disponibilidades;
          if (
            disponibilidades.length > 0 &&
            disponibilidades[0].idAsiento?.idSala?.id
          ) {
            this.loadSalaSeats(disponibilidades[0].idAsiento.idSala.id);
          } else {
            this.error = 'No se pudo obtener información de la sala';
            this.loading = false;
          }
        },
        error: () => {
          this.error = 'Error al cargar la disponibilidad de asientos';
          this.loading = false;
        },
      });
  }

  // Carga los asientos de la sala correspondiente
  private loadSalaSeats(salaId: number): void {
    this.asientoService.getAsientosPorSalaId(salaId).subscribe({
      next: (asientos) => {
        this.processSeats(asientos);
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar los asientos de la sala';
        this.loading = false;
      },
    });
  }

  // Organiza los asientos por fila y los asocia con su disponibilidad
  private processSeats(asientos: Asiento[]): void {
    this.rows = [];
    this.seatsPerRow = {};
    const rowsSet = new Set<string>();
    asientos.forEach((asiento) => rowsSet.add(asiento.fila));
    this.rows = Array.from(rowsSet).sort();
    this.rows.forEach((row) => {
      this.seatsPerRow[row] = [];
      const rowSeats = asientos.filter((a) => a.fila === row);
      rowSeats.sort((a, b) => a.numero - b.numero);
      rowSeats.forEach((asiento) => {
        const seatDisplay = new SeatDisplay(
          asiento.fila,
          asiento.numero,
          asiento.id
        );
        const availability = this.availabilityData.find(
          (a) => a.idAsiento && a.idAsiento.id === asiento.id
        );
        if (availability) {
          seatDisplay.estado = availability.estado as string;
          seatDisplay.disponibilidadId = availability.id;
        }
        this.seatsPerRow[row].push(seatDisplay);
      });
    });
  }

  // Maneja el click sobre un asiento, reservando y liberando según corresponda
  onSeatClick(seat: SeatDisplay): void {
    // No permitir seleccionar otro asiento mientras hay una reserva activa
    if (
      this.reservedDisponibilidadId &&
      seat.disponibilidadId !== this.reservedDisponibilidadId
    ) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Solo puedes reservar un asiento',
        detail: 'Cancela tu reserva actual para seleccionar otro asiento.',
      });
      return;
    }
    // Verificar si el asiento es seleccionable
    if (!seat.isSelectable) {
      this.messageService.add({
        severity: 'error',
        summary: 'Asiento no disponible',
        detail: 'Este asiento ya está ocupado o reservado',
      });
      return;
    }
    // Liberar el asiento previamente reservado si es necesario
    if (
      this.reservedDisponibilidadId &&
      this.reservedDisponibilidadId !== seat.disponibilidadId
    ) {
      this.dispoAsientoService
        .liberarAsiento(this.reservedDisponibilidadId)
        .subscribe({
          next: () => {},
          error: () => {},
        });
    }
    // Reservar el nuevo asiento
    if (seat.disponibilidadId) {
      this.dispoAsientoService
        .reservarAsiento(seat.disponibilidadId)
        .subscribe({
          next: (updated) => {
            // Deseleccionar la selección anterior
            if (this.selectedSeatDisplay) {
              this.selectedSeatDisplay.selected = false;
            }
            seat.selected = true;
            seat.estado = 'reservado';
            this.selectedSeatDisplay = seat;
            this.reservedDisponibilidadId = seat.disponibilidadId!;

            // Actualizar el objeto de disponibilidad y emitir el evento
            const availability = this.availabilityData.find(
              (a) => a.id === seat.disponibilidadId
            );
            if (availability) {
              availability.estado = 'reservado';
              this.selectedAvailability = availability;
              this.seatSelected.emit(availability);
            }

            this.startCountdown(10 * 60); // 10 minutos en segundos
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo reservar el asiento. Intenta de nuevo.',
            });
          },
        });
    }
  }

  // Inicia el temporizador de reserva
  private startCountdown(seconds: number): void {
    this.clearCountdown();
    this.countdown = seconds;
    this.countdownInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        this.clearCountdown();
        this.handleCountdownExpired();
      }
    }, 1000);
  }

  // Limpia el temporizador
  private clearCountdown(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }
    this.countdown = 0;
  }

  // Libera el asiento si el tiempo de reserva expira
  private handleCountdownExpired(): void {
    if (this.reservedDisponibilidadId) {
      this.dispoAsientoService
        .liberarAsiento(this.reservedDisponibilidadId)
        .subscribe();
      this.reservedDisponibilidadId = null;
    }
    if (this.selectedSeatDisplay) {
      this.selectedSeatDisplay.selected = false;
      this.selectedSeatDisplay = null;
    }
    this.selectedAvailability = null;
    this.messageService.add({
      severity: 'warn',
      summary: 'Reserva expirada',
      detail: 'El tiempo para reservar el asiento ha expirado.',
    });
  }

  // Continúa al pago si hay un asiento seleccionado
  handleContinueToPayment(): void {
    if (!this.selectedAvailability) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Selección requerida',
        detail: 'Debes seleccionar un asiento para continuar',
      });
      return;
    }
    this.clearCountdown();
    this.continueToPayment.emit();
  }

  // Cancela la selección y libera el asiento reservado
  handleCancelSelection(): void {
    this.handleReservationCancelOnly();
    this.cancelSelection.emit();
  }

  // Libera el asiento reservado sin emitir evento externo
  handleReservationCancelOnly(): void {
    if (this.reservedDisponibilidadId) {
      this.dispoAsientoService
        .liberarAsiento(this.reservedDisponibilidadId)
        .subscribe({
          next: () => {
            if (this.selectedSeatDisplay) {
              this.selectedSeatDisplay.selected = false;
              this.selectedSeatDisplay.estado = 'disponible';
            }
            this.selectedSeatDisplay = null;
            this.selectedAvailability = null;
          },
          error: () => {
            if (this.selectedSeatDisplay) {
              this.selectedSeatDisplay.selected = false;
              this.selectedSeatDisplay.estado = 'disponible';
            }
            this.selectedSeatDisplay = null;
            this.selectedAvailability = null;
          },
        });
      this.reservedDisponibilidadId = null;
    } else {
      if (this.selectedSeatDisplay) {
        this.selectedSeatDisplay.selected = false;
        this.selectedSeatDisplay.estado = 'disponible';
      }
      this.selectedSeatDisplay = null;
      this.selectedAvailability = null;
    }
    this.clearCountdown();
  }
}
