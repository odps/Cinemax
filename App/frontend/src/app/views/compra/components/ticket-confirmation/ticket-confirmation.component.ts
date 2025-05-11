import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Pelicula } from '../../../../core/interfaces/pelicula';
import { Sala } from '../../../../core/interfaces/sala';
import { DisponibilidadAsiento } from '../../../../core/interfaces/disponibilidad-asiento';
import { Funcion } from '../../../../core/interfaces/funcion';
import { Factura } from '../../../../core/interfaces/factura';

export interface TicketInfo {
  id: number;
  fechaCompra: Date;
  asiento: DisponibilidadAsiento;
  funcion: Funcion;
  precio: number;
}

@Component({
  selector: 'app-ticket-confirmation',
  standalone: true,
  imports: [CommonModule, ButtonModule, DialogModule],
  templateUrl: './ticket-confirmation.component.html',
  styleUrls: ['./ticket-confirmation.component.css'],
})
export class TicketConfirmationComponent {
  @Input() ticket: TicketInfo | null = null;
  @Input() pelicula: Pelicula | null = null;
  @Input() sala: Sala | null = null;
  @Input() factura: Factura | null = null;

  @Output() returnToHome = new EventEmitter<void>();
  @Output() goToShowtimes = new EventEmitter<void>();

  showPrintDialog: boolean = false;

  constructor() {}

  printTicket(): void {
    this.showPrintDialog = true;
  }

  executePrint(): void {
    window.print();
  }

  backToHome(): void {
    this.returnToHome.emit();
  }

  viewMovies(): void {
    this.goToShowtimes.emit();
  }
}
