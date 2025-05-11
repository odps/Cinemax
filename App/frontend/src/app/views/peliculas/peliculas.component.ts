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

  calificacionMinima = 0;
  fechaEstreno: Date | null = null;
  terminoBusqueda: string = '';
  duracion: number | null = null;
  limiteEdad: string | null = null;
  director: string = '';
  descripcion: string = '';

  opcionesOrden = [
    { id: 1, nombre: 'Más recientes' },
    { id: 2, nombre: 'Mejor valoradas' },
    { id: 3, nombre: 'Alfabético A-Z' },
  ];

  ordenSeleccionado = this.opcionesOrden[0];

  vistasDisponibles = [
    { nombre: 'Grid', valor: 'grid', icon: 'pi pi-th-large' },
    { nombre: 'Lista', valor: 'lista', icon: 'pi pi-list' },
  ];

  vistaSeleccionada = 'grid';

  peliculas: Pelicula[] = [];
  peliculaDestacada: Pelicula | null = null;

  cargando: boolean = false;
  totalPeliculas: number = 0;

  currentPage: number = 0;
  rowsPerPage: number = 9;

  constructor(
    private peliculasService: PeliculasService,
    private cineService: CineService
  ) {}

  ngOnInit() {
    this.cargarPeliculas();
    this.cargarCines();
  }

  cargarPeliculas() {
    this.cargando = true;
    this.peliculasService
      .getListaPeliculas()
      .pipe(finalize(() => (this.cargando = false)))
      .subscribe({
        next: (peliculas: Pelicula[]) => {
          this.peliculas = peliculas;
          this.totalPeliculas = peliculas.length;

          // Seleccionar una película destacada (por ejemplo, la primera)
          if (peliculas.length > 0) {
            this.peliculaDestacada = peliculas[0];
          }
        },
        error: (error) => {
          console.error('Error al cargar las películas:', error);
          // Aquí podrías implementar una gestión de errores más elaborada
        },
      });
  }

  cargarCines() {
    this.cineService.getListaCines().subscribe({
      next: (cines) => {
        this.cines = cines
          .filter((cine) => cine.id !== undefined)
          .map((cine) => ({ id: cine.id!, nombre: cine.nombre }));
      },
      error: (error) => {
        console.error('Error al cargar los cines:', error);
      },
    });
  }

  aplicarFiltros() {
    this.cargando = true;
    this.peliculasService
      .getListaPeliculas()
      .pipe(finalize(() => (this.cargando = false)))
      .subscribe({
        next: (peliculas: Pelicula[]) => {
          this.peliculas = peliculas.filter((pelicula) => {
            return (
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
        },
        error: (error) => {
          console.error('Error al aplicar filtros:', error);
        },
      });
  }

  limpiarFiltros() {
    this.terminoBusqueda = '';
    this.duracion = null;
    this.limiteEdad = null;
    this.cines = this.cines.map((cine) => ({
      id: cine.id,
      nombre: cine.nombre,
    })); // Reset cine selection
    this.cargarPeliculas();
  }

  buscarDirector(director: string) {
    this.cargando = true;
    this.peliculasService
      .buscarPeliculasPorDirector(director)
      .pipe(finalize(() => (this.cargando = false)))
      .subscribe({
        next: (peliculas) => {
          this.peliculas = peliculas;
          this.totalPeliculas = peliculas.length;
        },
        error: (error) => console.error('Error al buscar por director:', error),
      });
  }

  onPageChange(event: any) {
    this.currentPage = event.page;
    this.rowsPerPage = event.rows;
    // Implementar paginación con el backend o hacer paginación local
  }
}
