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

  peliculaDestacada = {
    imageUrl: 'assets/images/pelicula-destacada.jpg',
    title: 'Dune: Parte Dos',
    releaseDate: '15/03/2024',
    genres: 'Ciencia ficción, Aventura'
  };

  peliculas = [
    {
      imageUrl: 'assets/images/pelicula1.jpg',
      title: 'Gladiador II',
      releaseDate: '22/11/2024',
      genres: 'Acción, Drama histórico'
    },
    {
      imageUrl: 'assets/images/pelicula2.jpg',
      title: 'Deadpool & Wolverine',
      releaseDate: '26/07/2024',
      genres: 'Acción, Comedia'
    },
    {
      imageUrl: 'assets/images/pelicula3.jpg',
      title: 'Furiosa',
      releaseDate: '24/05/2024',
      genres: 'Acción, Ciencia ficción'
    },
    {
      imageUrl: 'assets/images/pelicula4.jpg',
      title: 'Alien: Romulus',
      releaseDate: '16/08/2024',
      genres: 'Ciencia ficción, Terror'
    },
    {
      imageUrl: 'assets/images/pelicula5.jpg',
      title: 'Inside Out 2',
      releaseDate: '14/06/2024',
      genres: 'Animación, Comedia'
    },
    {
      imageUrl: 'assets/images/pelicula6.jpg',
      title: 'Kung Fu Panda 4',
      releaseDate: '08/03/2024',
      genres: 'Animación, Aventura'
    }
  ];

  totalPeliculas = 24;

  ngOnInit() {
  }
}
