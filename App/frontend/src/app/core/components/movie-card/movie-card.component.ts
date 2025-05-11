import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Pelicula } from '../../interfaces/pelicula';
import {assetsLocation} from '../../../../environments/environment';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
  standalone: true,
  imports: [CommonModule, ButtonModule, DialogModule]
})
export class MovieCardComponent {
  @Input() pelicula!: Pelicula;
  @Input() isHighlighted: boolean = false;
  protected readonly assetsLocation = assetsLocation;

  mostrarModal: boolean = false;

  mostrarDetalles() {
    this.mostrarModal = true;
  }
}
