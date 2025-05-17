import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pelicula } from '../../../../core/interfaces/pelicula';
import { Funcion } from '../../../../core/interfaces/funcion';
import { Sala } from '../../../../core/interfaces/sala';

@Component({
  selector: 'app-movie-function-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-function-details.component.html',
  styleUrls: ['./movie-function-details.component.css'],
})
export class MovieFunctionDetailsComponent {
  // Recibe la información de la película, función y sala para mostrar los detalles en la vista
  @Input() pelicula: Pelicula | null = null;
  @Input() funcion: Funcion | null = null;
  @Input() sala: Sala | null = null;
}
