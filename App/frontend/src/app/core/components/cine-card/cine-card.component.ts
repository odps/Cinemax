import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Cine } from '../../interfaces/cine';
import { assetsLocation } from '../../../../environments/environment';

@Component({
  selector: 'app-cine-card',
  templateUrl: './cine-card.component.html',
  styleUrls: ['./cine-card.component.css'],
  standalone: true,
  imports: [CommonModule, ButtonModule],
})
export class CineCardComponent {
  @Input() cine!: Cine; // Recibe el objeto cine a mostrar en la tarjeta
  @Input() isHighlighted: boolean = false; // Indica si la tarjeta debe mostrarse como destacada
  @Output() verDetalles = new EventEmitter<Cine>(); // Emite evento para ver detalles del cine
  @Output() verCartelera = new EventEmitter<Cine>(); // Emite evento para ver la cartelera del cine
  protected readonly assetsLocation = assetsLocation; // Ruta base para los assets

  // Emite el evento para mostrar detalles del cine seleccionado
  mostrarDetalles(): void {
    this.verDetalles.emit(this.cine);
  }

  // Emite el evento para mostrar la cartelera del cine seleccionado
  mostrarCartelera(): void {
    this.verCartelera.emit(this.cine);
  }
}
