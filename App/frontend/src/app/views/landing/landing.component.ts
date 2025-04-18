import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MovieCardComponent } from '../../core/components/movie-card/movie-card.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    MovieCardComponent
  ]
})
export class LandingComponent {
  movies = [
    {
      imageUrl: 'assets/logo.png',
      title: 'Título de la Película',
      releaseDate: '15 de Diciembre',
      genres: 'Acción, Aventura'
    },
    {
      imageUrl: 'assets/logo.png',
      title: 'Título de la Película',
      releaseDate: '20 de Diciembre',
      genres: 'Comedia, Drama'
    },
    {
      imageUrl: 'assets/logo.png',
      title: 'Título de la Película',
      releaseDate: '25 de Diciembre',
      genres: 'Ciencia ficción, Thriller'
    }
  ];

  highlightedMovie = {
    imageUrl: 'assets/logo.png',
    title: 'Gran estreno del mes',
    releaseDate: 'Próximamente',
    genres: 'Especial'
  };
}
