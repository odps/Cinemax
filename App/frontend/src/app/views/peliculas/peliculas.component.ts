import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PaginatorModule } from 'primeng/paginator';
import { MovieCardComponent } from '../../core/components/movie-card/movie-card.component';
import { PeliculasService } from '../../core/services/peliculas.service';
import { Pelicula } from '../../core/interfaces/pelicula';
import { finalize } from 'rxjs';
import { CineService } from '../../core/services/cine.service';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    MultiSelectModule,
    DropdownModule,
    RatingModule,
    CalendarModule,
    SelectButtonModule,
    PaginatorModule,
    MovieCardComponent,
  ],
  templateUrl: './peliculas.component.html',
  styleUrl: './peliculas.component.css',
})
export class PeliculasComponent implements OnInit {
  generos = [
    { id: 1, nombre: 'Accion' },
    { id: 2, nombre: 'Romance' },
    { id: 3, nombre: 'Comedia' },
    { id: 4, nombre: 'Horror' },
    { id: 5, nombre: 'Drama' },
    { id: 6, nombre: 'Ciencia Ficcion' },
    { id: 7, nombre: 'Aventura' },
    { id: 8, nombre: 'Fantasia' },
  ];

  cines: { id: number; nombre: string }[] = [];

  limitesEdad = [
    { nombre: 'PEGI 7' },
    { nombre: 'PEGI 13' },
    { nombre: 'PEGI 16' },
    { nombre: 'PEGI 18' },
  ];

  terminoBusqueda: string = '';
  duracion: number | null = null;
  limiteEdad: string | null = null;
  // selectedGeneros almacena los géneros seleccionados en el filtro
  selectedGeneros: any[] = [];

  peliculas: Pelicula[] = [];
  peliculasPaginadas: Pelicula[] = [];
  peliculaDestacada: Pelicula | null = null;

  cargando: boolean = false;
  totalPeliculas: number = 0;

  currentPage: number = 0;
  rowsPerPage: number = 10;

  constructor(
    private peliculasService: PeliculasService,
    private cineService: CineService
  ) {}

  ngOnInit() {
    this.cargarPeliculas();
    this.cargarCines();
  }

  // Carga todas las películas y selecciona una destacada aleatoriamente
  cargarPeliculas() {
    this.cargando = true;
    this.peliculasService
      .getListaPeliculas()
      .pipe(finalize(() => (this.cargando = false)))
      .subscribe({
        next: (peliculas: Pelicula[]) => {
          this.peliculas = peliculas;
          this.totalPeliculas = peliculas.length;

          if (peliculas.length > 0) {
            const randomIndex = Math.floor(Math.random() * peliculas.length);
            this.peliculaDestacada = peliculas[randomIndex];
          }
          this.actualizarPeliculasPaginadas();
        },
        error: (error) => {
          // Error al cargar las películas
        },
      });
  }

  // Carga la lista de cines disponibles
  cargarCines() {
    this.cineService.getListaCines().subscribe({
      next: (cines) => {
        this.cines = cines
          .filter((cine) => cine.id !== undefined)
          .map((cine) => ({ id: cine.id!, nombre: cine.nombre }));
      },
      error: (error) => {
        // Error al cargar los cines
      },
    });
  }

  // Aplica los filtros seleccionados a la lista de películas
  aplicarFiltros() {
    this.cargando = true;
    this.peliculasService
      .getListaPeliculas()
      .pipe(finalize(() => (this.cargando = false)))
      .subscribe({
        next: (peliculas: Pelicula[]) => {
          this.peliculas = peliculas.filter((pelicula) => {
            const generoMatch =
              this.selectedGeneros.length === 0 ||
              this.selectedGeneros.some((g) => g.nombre === pelicula.genero);
            return (
              generoMatch &&
              (!this.terminoBusqueda ||
                pelicula.titulo
                  .toLowerCase()
                  .includes(this.terminoBusqueda.toLowerCase())) &&
              (!this.duracion ||
                (pelicula.duracion !== undefined &&
                  pelicula.duracion >= this.duracion)) &&
              (!this.limiteEdad || pelicula.limiteEdad === this.limiteEdad)
            );
          });
          this.totalPeliculas = this.peliculas.length;

          if (this.peliculas.length > 0) {
            this.peliculaDestacada = this.peliculas[0];
          }
          this.currentPage = 0;
          this.actualizarPeliculasPaginadas();
        },
        error: (error) => {
          // Error al aplicar filtros
        },
      });
  }

  // Limpia todos los filtros y recarga la lista de películas
  limpiarFiltros() {
    this.terminoBusqueda = '';
    this.duracion = null;
    this.limiteEdad = null;
    this.selectedGeneros = [];
    this.currentPage = 0;
    this.cargarPeliculas();
  }

  // Actualiza la lista de películas a mostrar en la página actual, evitando duplicar la destacada
  actualizarPeliculasPaginadas() {
    let peliculasFiltradas = this.peliculas;
    if (this.peliculaDestacada) {
      peliculasFiltradas = peliculasFiltradas.filter(
        (p) => p.id !== this.peliculaDestacada?.id
      );
    }
    const start = this.currentPage * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    this.peliculasPaginadas = peliculasFiltradas.slice(start, end);
  }

  // Maneja el cambio de página en la paginación
  onPageChange(event: any) {
    this.currentPage = event.page;
    this.rowsPerPage = event.rows;
    this.actualizarPeliculasPaginadas();
  }
}
