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
  imports: [CommonModule, ButtonModule, MovieCardComponent],
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

  // Carga la lista de películas y selecciona una al azar para destacar
  cargarPeliculas(): void {
    this.cargando = true;
    this.peliculasService
      .getListaPeliculas()
      .pipe(finalize(() => (this.cargando = false)))
      .subscribe({
        next: (peliculas) => {
          if (peliculas.length > 0) {
            // Selecciona una película aleatoria para destacar
            const randomIndex = Math.floor(Math.random() * peliculas.length);
            this.highlightedMovie = peliculas[randomIndex];
            // Selecciona un subconjunto de películas para mostrar en el grid
            this.movies = peliculas.slice(1, 4);
          }
        },
        error: (error) => {
          // Error al cargar las películas
        },
      });
  }

  // Navega a la cartelera de películas
  verCartelera(): void {
    this.router.navigate(['/peliculas']);
  }

  // Navega a la sección de promociones
  verPromociones(): void {
    this.router.navigate(['/promociones']);
  }
}
