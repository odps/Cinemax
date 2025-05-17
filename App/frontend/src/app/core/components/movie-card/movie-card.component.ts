import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Pelicula } from '../../interfaces/pelicula';
import { assetsLocation } from '../../../../environments/environment';
import { Funcion } from '../../interfaces/funcion';
import { Sala } from '../../interfaces/sala';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
  standalone: true,
  imports: [CommonModule, ButtonModule, DialogModule],
})
export class MovieCardComponent {
  @Input() pelicula!: Pelicula;
  @Input() isHighlighted: boolean = false;
  @Output() reservarEntradas = new EventEmitter<Pelicula>();
  protected readonly assetsLocation = assetsLocation;

  mostrarModal: boolean = false;
  mostrarSalasModal: boolean = false;

  mostrarDetalles() {
    this.mostrarModal = true;
  }

  abrirSalasModal() {
    this.mostrarSalasModal = true;
  }

  cerrarSalasModal() {
    this.mostrarSalasModal = false;
  }

  // Agrupa las funciones por sala para mostrar en el modal de selección de sala y función
  // Retorna un arreglo de objetos, cada uno con la sala y las funciones asociadas a esa sala
  agruparFuncionesPorSala(funciones: Funcion[]) {
    const grupos: { sala: any; funciones: Funcion[] }[] = [];
    const mapa = new Map<number, { sala: any; funciones: Funcion[] }>();
    for (const funcion of funciones) {
      const salaId = funcion.idSala?.id;
      if (!salaId) continue;
      if (!mapa.has(salaId)) {
        mapa.set(salaId, { sala: funcion.idSala, funciones: [] });
        grupos.push(mapa.get(salaId)!);
      }
      mapa.get(salaId)!.funciones.push(funcion);
    }
    return grupos;
  }
}
