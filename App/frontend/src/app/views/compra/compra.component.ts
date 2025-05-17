import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { StepsModule } from 'primeng/steps';
import { MenuItem, MessageService } from 'primeng/api';

import { AuthService } from '../../core/services/auth.service';
import { FuncionService } from '../../core/services/funcion.service';
import { PeliculasService } from '../../core/services/peliculas.service';
import { SalaService } from '../../core/services/sala.service';
import { TicketService } from '../../core/services/ticket.service';

import { Funcion } from '../../core/interfaces/funcion';
import { Pelicula } from '../../core/interfaces/pelicula';
import { Sala } from '../../core/interfaces/sala';
import { DisponibilidadAsiento } from '../../core/interfaces/disponibilidad-asiento';
import { Factura } from '../../core/interfaces/factura';

import { MovieFunctionDetailsComponent } from './components/movie-function-details/movie-function-details.component';
import { SeatMapComponent } from './components/seat-map/seat-map.component';
import {
  PaymentFormComponent,
  PaymentData,
} from './components/payment-form/payment-form.component';
import {
  TicketConfirmationComponent,
  TicketInfo,
} from './components/ticket-confirmation/ticket-confirmation.component';

// Enum para los pasos de la compra
enum PurchaseStep {
  SEAT_SELECTION = 0,
  PAYMENT = 1,
  CONFIRMATION = 2,
}

@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [
    CommonModule,
    ToastModule,
    StepsModule,
    MovieFunctionDetailsComponent,
    SeatMapComponent,
    PaymentFormComponent,
    TicketConfirmationComponent,
  ],
  providers: [MessageService],
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css'],
})
export class CompraComponent implements OnInit {
  // Datos de función, película y sala
  funcionId: number | null = null;
  funcion: Funcion | null = null;
  pelicula: Pelicula | null = null;
  sala: Sala | null = null;

  // Manejo de pasos del proceso de compra
  currentStep: PurchaseStep = PurchaseStep.SEAT_SELECTION;
  steps: MenuItem[] = [
    { label: 'Seleccionar Asiento' },
    { label: 'Pagar' },
    { label: 'Confirmación' },
  ];

  // Asiento seleccionado
  selectedSeat: DisponibilidadAsiento | null = null;

  // Ticket y factura generados
  ticketInfo: TicketInfo | null = null;
  facturaInfo: Factura | null = null;

  // Estados de UI
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private funcionService: FuncionService,
    private peliculasService: PeliculasService,
    private salaService: SalaService,
    private ticketService: TicketService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.checkAuthentication();
    this.loadFunctionData();
  }

  // Verifica si el usuario está autenticado antes de permitir la compra
  private checkAuthentication(): void {
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      if (!isAuthenticated) {
        this.messageService.add({
          severity: 'error',
          summary: 'Acceso denegado',
          detail: 'Debes iniciar sesión para comprar tickets',
        });
        this.router.navigate(['/']);
      }
    });
  }

  // Carga el id de la función desde los parámetros de la URL y valida su existencia
  private loadFunctionData(): void {
    this.loading = true;
    this.route.queryParams.subscribe((params) => {
      this.funcionId = params['funcionId'] ? Number(params['funcionId']) : null;
      if (!this.funcionId) {
        this.error = 'No se ha especificado una función válida';
        this.loading = false;
        return;
      }
      this.loadFunction(this.funcionId);
    });
  }

  // Carga la función y sus datos relacionados (película y sala)
  private loadFunction(funcionId: number): void {
    this.funcionService.getFuncionById(funcionId).subscribe({
      next: (funcion) => {
        this.funcion = funcion;
        if (funcion.idPelicula && funcion.idPelicula.id) {
          this.loadMovie(funcion.idPelicula.id);
        } else {
          this.error = 'La función no tiene una película asociada';
          this.loading = false;
        }
        if (funcion.idSala && funcion.idSala.id) {
          this.loadSala(funcion.idSala.id);
        } else {
          this.error = 'La función no tiene una sala asociada';
          this.loading = false;
        }
      },
      error: () => {
        this.error = 'Error al cargar la información de la función';
        this.loading = false;
      },
    });
  }

  // Carga los datos de la película
  private loadMovie(peliculaId: number): void {
    this.peliculasService.getPeliculaPorId(peliculaId).subscribe({
      next: (pelicula) => {
        this.pelicula = pelicula;
        this.checkLoadingComplete();
      },
      error: () => {
        this.error = 'Error al cargar la información de la película';
        this.loading = false;
      },
    });
  }

  // Carga los datos de la sala
  private loadSala(salaId: number): void {
    this.salaService.getSalaPorId(salaId).subscribe({
      next: (sala) => {
        this.sala = sala;
        this.checkLoadingComplete();
      },
      error: () => {
        this.error = 'Error al cargar la información de la sala';
        this.loading = false;
      },
    });
  }

  // Verifica que todos los datos requeridos estén cargados antes de continuar
  private checkLoadingComplete(): void {
    if (this.pelicula && this.sala && this.funcion) {
      this.loading = false;
    }
  }

  // Evento: se selecciona un asiento
  onSeatSelected(seat: DisponibilidadAsiento): void {
    this.selectedSeat = seat;
  }

  // Evento: continuar al paso de pago, validando que haya un asiento seleccionado
  onContinueToPayment(): void {
    if (!this.selectedSeat) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Selección requerida',
        detail: 'Debes seleccionar un asiento para continuar',
      });
      return;
    }
    this.currentStep = PurchaseStep.PAYMENT;
  }

  // Evento: se envía el formulario de pago
  onPaymentSubmitted(paymentData: PaymentData): void {
    this.loading = true;
    // Simulación de procesamiento de pago
    setTimeout(() => {
      this.loading = false;
      this.generateTicket(paymentData.paymentMethod);
    }, 1500);
  }

  // Evento: cancelar el pago y volver a la selección de asiento
  onCancelPayment(): void {
    this.currentStep = PurchaseStep.SEAT_SELECTION;
  }

  // Genera el ticket y la factura, validando que toda la información esté presente
  private generateTicket(paymentMethod: string = 'card'): void {
    if (!this.selectedSeat || !this.selectedSeat.idAsiento || !this.funcion) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No hay suficiente información para generar el ticket',
      });
      return;
    }
    this.authService.currentUser$.subscribe((user) => {
      if (!user || !user.id) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Debes iniciar sesión para generar un ticket',
        });
        return;
      }
      // Calcula el monto total a partir del precio de la función
      const montoTotal = this.funcion!.precio
        ? Math.round(this.funcion!.precio)
        : 0;
      // Estructura del request para el backend
      const ticketRequest = {
        usuarioId: user.id,
        funcionId: this.funcion!.id,
        asientoId: this.selectedSeat!.idAsiento.id,
        metodoPago: paymentMethod,
        montoTotal: montoTotal,
      };
      this.ticketService.comprarTicket(ticketRequest).subscribe({
        next: (result) => {
          const ticket = result.ticket;
          const factura = result.factura;
          this.ticketInfo = {
            id: ticket.id,
            fechaCompra: new Date(ticket.fechaCompra),
            asiento: this.selectedSeat!,
            funcion: this.funcion!,
            precio: this.funcion!.precio,
          };
          this.facturaInfo = factura;
          this.currentStep = PurchaseStep.CONFIRMATION;
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Ha ocurrido un error al generar el ticket',
          });
        },
      });
    });
  }

  // Navega a la página principal
  onReturnToHome(): void {
    this.router.navigate(['/']);
  }

  // Navega a la cartelera de funciones
  onGoToShowtimes(): void {
    this.router.navigate(['/peliculas']);
  }

  // Resetea la selección de asiento
  onCancelSeatSelection(): void {
    this.selectedSeat = null;
  }
}
