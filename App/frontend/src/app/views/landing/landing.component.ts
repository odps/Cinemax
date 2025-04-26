import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MovieCardComponent } from '../../core/components/movie-card/movie-card.component';
import { PeliculasService } from '../../core/services/peliculas.service';
import { Pelicula } from '../../core/interfaces/pelicula';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

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
export class LandingComponent implements OnInit {
  movies: Pelicula[] = [];
  highlightedMovie: Pelicula | null = null;
  cargando = false;

  constructor(
    private peliculasService: PeliculasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarPeliculas();
  }

  cargarPeliculas(): void {
    this.cargando = true;
    this.peliculasService.getListaPeliculas()
      .pipe(finalize(() => this.cargando = false))
      .subscribe({
        next: (peliculas) => {
          if (peliculas.length > 0) {
            // Seleccionamos la primera película como destacada
            this.highlightedMovie = peliculas[0];

            // El resto de películas (hasta 3) para la sección de próximos estrenos
            this.movies = peliculas.slice(1, 4);
          }
        },
        error: (error) => {
          console.error('Error al cargar las películas:', error);
        }
      });
  }

  verCartelera(): void {
    this.router.navigate(['/peliculas']);
  }
}
