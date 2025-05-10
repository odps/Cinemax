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

// Simple class for visual seat representation
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
  imports: [CommonModule, ToastModule, ButtonModule],
  providers: [MessageService],
  templateUrl: './seat-map.component.html',
  styleUrls: ['./seat-map.component.css'],
})
export class SeatMapComponent implements OnInit, OnChanges {
  @Input() funcionId: number | null = null;

  @Output() seatSelected = new EventEmitter<DisponibilidadAsiento>();
  @Output() continueToPayment = new EventEmitter<void>();
  @Output() cancelSelection = new EventEmitter<void>();

  // Simple data structure for rendering
  rows: string[] = [];
  seatsPerRow: { [key: string]: SeatDisplay[] } = {};

  // Track original data
  availabilityData: DisponibilidadAsiento[] = [];
  selectedSeatDisplay: SeatDisplay | null = null;
  selectedAvailability: DisponibilidadAsiento | null = null;

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

  private loadSeats(): void {
    if (!this.funcionId) return;

    this.loading = true;
    this.error = null;

    // We'll need to get the sala ID from the first seat's availability
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
        error: (err) => {
          console.error('Error loading seat availability:', err);
          this.error = 'Error al cargar la disponibilidad de asientos';
          this.loading = false;
        },
      });
  }

  private loadSalaSeats(salaId: number): void {
    this.asientoService.getAsientosPorSalaId(salaId).subscribe({
      next: (asientos) => {
        this.processSeats(asientos);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading sala seats:', err);
        this.error = 'Error al cargar los asientos de la sala';
        this.loading = false;
      },
    });
  }

  private processSeats(asientos: Asiento[]): void {
    // Clear previous data
    this.rows = [];
    this.seatsPerRow = {};

    // Get unique rows and sort them
    const rowsSet = new Set<string>();
    asientos.forEach((asiento) => rowsSet.add(asiento.fila));
    this.rows = Array.from(rowsSet).sort();

    // Organize seats by row
    this.rows.forEach((row) => {
      this.seatsPerRow[row] = [];

      // Get all seats for this row
      const rowSeats = asientos.filter((a) => a.fila === row);

      // Sort by seat number
      rowSeats.sort((a, b) => a.numero - b.numero);

      // Create display objects
      rowSeats.forEach((asiento) => {
        const seatDisplay = new SeatDisplay(
          asiento.fila,
          asiento.numero,
          asiento.id
        );

        // Find availability info for this seat
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

  onSeatClick(seat: SeatDisplay): void {
    if (!seat.isSelectable) {
      this.messageService.add({
        severity: 'error',
        summary: 'Asiento no disponible',
        detail: 'Este asiento ya está ocupado o reservado',
      });
      return;
    }

    // Deselect previous selection
    if (this.selectedSeatDisplay) {
      this.selectedSeatDisplay.selected = false;
    }

    // Toggle selection
    seat.selected = true;
    this.selectedSeatDisplay = seat;

    // Find corresponding availability object to emit
    const availability = this.availabilityData.find(
      (a) => a.idAsiento && a.idAsiento.id === seat.asientoId
    );

    if (availability) {
      this.selectedAvailability = availability;
      this.seatSelected.emit(availability);
    }
  }

  handleContinueToPayment(): void {
    if (!this.selectedAvailability) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Selección requerida',
        detail: 'Debes seleccionar un asiento para continuar',
      });
      return;
    }

    this.continueToPayment.emit();
  }

  handleCancelSelection(): void {
    this.cancelSelection.emit();
  }
}
