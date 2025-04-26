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
    MovieCardComponent
  ],
  templateUrl: './peliculas.component.html',
  styleUrl: './peliculas.component.css'
})
export class PeliculasComponent implements OnInit {
  generos = [
    { id: 1, nombre: 'Acción' },
    { id: 2, nombre: 'Comedia' },
    { id: 3, nombre: 'Drama' },
    { id: 4, nombre: 'Ciencia ficción' },
    { id: 5, nombre: 'Terror' }
  ];

  cines = [
    { id: 1, nombre: 'CineMaxx Norte' },
    { id: 2, nombre: 'CineMaxx Sur' },
    { id: 3, nombre: 'CineMaxx Este' },
    { id: 4, nombre: 'CineMaxx Oeste' }
  ];

  calificacionMinima = 0;
  fechaEstreno: Date | null = null;
  terminoBusqueda: string = '';

  opcionesOrden = [
    { id: 1, nombre: 'Más recientes' },
    { id: 2, nombre: 'Mejor valoradas' },
    { id: 3, nombre: 'Alfabético A-Z' }
  ];

  ordenSeleccionado = this.opcionesOrden[0];

  vistasDisponibles = [
    { nombre: 'Grid', valor: 'grid', icon: 'pi pi-th-large' },
    { nombre: 'Lista', valor: 'lista', icon: 'pi pi-list' }
  ];

  vistaSeleccionada = 'grid';

  peliculas: Pelicula[] = [];
  peliculaDestacada: Pelicula | null = null;

  cargando: boolean = false;
  totalPeliculas: number = 0;

  currentPage: number = 0;
  rowsPerPage: number = 9;

  constructor(private peliculasService: PeliculasService) {}

  ngOnInit() {
    this.cargarPeliculas();
  }

  cargarPeliculas() {
    this.cargando = true;
    this.peliculasService.getListaPeliculas()
      .pipe(finalize(() => this.cargando = false))
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
        }
      });
  }

  aplicarFiltros() {
    // Aquí implementarías la lógica de filtrado
    // Podrías crear un nuevo método en el servicio o filtrar localmente
    console.log('Filtros aplicados');
  }

  limpiarFiltros() {
    this.terminoBusqueda = '';
    this.calificacionMinima = 0;
    this.fechaEstreno = null;
    this.cargarPeliculas();
  }

  buscarDirector(director: string) {
    this.cargando = true;
    this.peliculasService.buscarPeliculasPorDirector(director)
      .pipe(finalize(() => this.cargando = false))
      .subscribe({
        next: (peliculas) => {
          this.peliculas = peliculas;
          this.totalPeliculas = peliculas.length;
        },
        error: (error) => console.error('Error al buscar por director:', error)
      });
  }

  onPageChange(event: any) {
    this.currentPage = event.page;
    this.rowsPerPage = event.rows;
    // Implementar paginación con el backend o hacer paginación local
  }
}
