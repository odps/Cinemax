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
  // Function and movie data
  funcionId: number | null = null;
  funcion: Funcion | null = null;
  pelicula: Pelicula | null = null;
  sala: Sala | null = null;

  // Step management
  currentStep: PurchaseStep = PurchaseStep.SEAT_SELECTION;
  steps: MenuItem[] = [
    { label: 'Seleccionar Asiento' },
    { label: 'Pagar' },
    { label: 'Confirmación' },
  ];

  // Selected seat
  selectedSeat: DisponibilidadAsiento | null = null;

  // Generated ticket
  ticketInfo: TicketInfo | null = null;
  facturaInfo: Factura | null = null;

  // UI states
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

  private loadFunction(funcionId: number): void {
    this.funcionService.getFuncionById(funcionId).subscribe({
      next: (funcion) => {
        this.funcion = funcion;

        // Load related movie data
        if (funcion.idPelicula && funcion.idPelicula.id) {
          this.loadMovie(funcion.idPelicula.id);
        } else {
          this.error = 'La función no tiene una película asociada';
          this.loading = false;
        }

        // Load related sala data
        if (funcion.idSala && funcion.idSala.id) {
          this.loadSala(funcion.idSala.id);
        } else {
          this.error = 'La función no tiene una sala asociada';
          this.loading = false;
        }
      },
      error: (err) => {
        console.error('Error loading function:', err);
        this.error = 'Error al cargar la información de la función';
        this.loading = false;
      },
    });
  }

  private loadMovie(peliculaId: number): void {
    this.peliculasService.getPeliculaPorId(peliculaId).subscribe({
      next: (pelicula) => {
        this.pelicula = pelicula;
        this.checkLoadingComplete();
      },
      error: (err) => {
        console.error('Error loading movie:', err);
        this.error = 'Error al cargar la información de la película';
        this.loading = false;
      },
    });
  }

  private loadSala(salaId: number): void {
    this.salaService.getSalaPorId(salaId).subscribe({
      next: (sala) => {
        this.sala = sala;
        this.checkLoadingComplete();
      },
      error: (err) => {
        console.error('Error loading sala:', err);
        this.error = 'Error al cargar la información de la sala';
        this.loading = false;
      },
    });
  }

  private checkLoadingComplete(): void {
    if (this.pelicula && this.sala && this.funcion) {
      this.loading = false;
    }
  }

  onSeatSelected(seat: DisponibilidadAsiento): void {
    this.selectedSeat = seat;
  }

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

  onPaymentSubmitted(paymentData: PaymentData): void {
    // Simulate payment processing - in a real app you would call a payment API
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this.generateTicket();
    }, 1500);
  }

  onCancelPayment(): void {
    // Go back to seat selection
    this.currentStep = PurchaseStep.SEAT_SELECTION;
  }

  private generateTicket(): void {
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

      const ticketRequest = {
        usuario: { id: user.id },
        funcion: { id: this.funcion!.id },
        asiento: { id: this.selectedSeat!.idAsiento.id },
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
        error: (err) => {
          console.error('Error generating ticket:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Ha ocurrido un error al generar el ticket',
          });
        },
      });
    });
  }

  onReturnToHome(): void {
    this.router.navigate(['/']);
  }

  onGoToShowtimes(): void {
    this.router.navigate(['/peliculas']);
  }
}
