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
  @Input() cine!: Cine;
  @Input() isHighlighted: boolean = false;
  @Output() verDetalles = new EventEmitter<Cine>();
  protected readonly assetsLocation = assetsLocation;

  mostrarDetalles(): void {
    this.verDetalles.emit(this.cine);
  }
}
