import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Pelicula } from '../../interfaces/pelicula';
import {assetsLocation} from '../../../../environments/environment';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
  standalone: true,
  imports: [CommonModule, ButtonModule]
})
export class MovieCardComponent {
  @Input() pelicula!: Pelicula;
  @Input() isHighlighted: boolean = false;
  protected readonly assetsLocation = assetsLocation;
}
