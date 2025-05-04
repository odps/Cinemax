import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { CineCardComponent } from '../../core/components/cine-card/cine-card.component';
import { CineService } from '../../core/services/cine.service';
import { Cine } from '../../core/interfaces/cine';

@Component({
  selector: 'app-cines',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CineCardComponent,
    DialogModule,
    TagModule,
  ],
  templateUrl: './cines.component.html',
  styleUrl: './cines.component.css',
})
export class CinesComponent implements OnInit {
  cines: Cine[] = [];
  cineDestacado: Cine | undefined;
  cineSeleccionado: Cine | undefined;
  modalVisible: boolean = false;
  cargando: boolean = false;

  constructor(private cineService: CineService) {}

  ngOnInit(): void {
    this.cargarCines();
  }

  cargarCines(): void {
    this.cargando = true;
    this.cineService.getListaCines().subscribe({
      next: (data) => {
        this.cines = data;
        // Asumimos que el primer cine es el destacado
        if (data.length > 0) {
          this.cineDestacado = data[0];
        }
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar los cines', error);
        this.cargando = false;
      },
    });
  }

  abrirModalDetalles(cine: Cine): void {
    // Si ya tenemos todos los detalles del cine, mostramos el modal directamente
    if (
      cine.descripcion !== null ||
      cine.horario !== null ||
      (cine.salas && cine.salas.length > 0)
    ) {
      this.cineSeleccionado = cine;
      this.modalVisible = true;
    } else {
      // Si no tenemos todos los detalles, hacemos otra petición para obtenerlos
      this.cargando = true;
      // Fix for the next error with the id possibly being undefined
      this.cineService.getCinePorId(cine.id!).subscribe({
        next: (cineDatos) => {
          this.cineSeleccionado = cineDatos;
          this.modalVisible = true;
          this.cargando = false;
        },
        error: (error) => {
          console.error('Error al obtener detalles del cine', error);
          this.cargando = false;
          // Mostramos el modal con los datos que tenemos aunque no sean completos
          this.cineSeleccionado = cine;
          this.modalVisible = true;
        },
      });
    }
  }

  cerrarModal(): void {
    this.modalVisible = false;
    this.cineSeleccionado = undefined;
  }
}
