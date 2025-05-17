import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { PromocionService } from '../../core/services/promocion.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Promocion } from '../../core/interfaces/promocion';
import { assetsLocation } from '../../../environments/environment';

@Component({
  selector: 'app-promociones',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    TagModule,
    DividerModule,
    DialogModule,
  ],
  templateUrl: './promociones.component.html',
  styleUrl: './promociones.component.css',
})
export class PromocionesComponent implements OnInit {
  promocionDestacada?: Promocion & { descuento?: number; imagen?: string };
  promociones: Array<Promocion & { descuento?: number; imagen?: string }> = [];
  loading: boolean = false;
  error: string | null = null;
  protected readonly assetsLocation = assetsLocation;
  selectedPromocion?: Promocion & { descuento?: number; imagen?: string };
  displayModal: boolean = false;

  constructor(private promocionService: PromocionService) {}

  ngOnInit(): void {
    this.cargarPromociones();
  }

  // Carga las promociones activas desde el servicio y selecciona una al azar como destacada
  cargarPromociones(): void {
    this.loading = true;
    this.error = null;

    this.promocionService
      .getPromocionesActivas()
      .pipe(
        catchError((err) => {
          this.error = 'Error al cargar las promociones: ' + err.message;
          this.loading = false;
          return of([]);
        })
      )
      .subscribe((data: any) => {
        this.loading = false;
        if (data && data.length > 0) {
          this.promociones = data.map((promo: Promocion) => {
            return {
              ...promo,
              descuento: this.extraerDescuento(promo.titulo, promo.descripcion),
              imagen: `${assetsLocation.assetUrl}/${
                promo.imagenUrl || 'promocion-placeholder.jpg'
              }`,
            };
          });

          // Selecciona una promoción al azar para destacarla
          const randomIndex = Math.floor(
            Math.random() * this.promociones.length
          );
          this.promociones[randomIndex].destacada = true;
          this.promocionDestacada = this.promociones[randomIndex];
        } else {
          this.promociones = [];
          this.promocionDestacada = undefined;
        }
      });
  }

  // Extrae el porcentaje de descuento de los textos de título o descripción
  private extraerDescuento(titulo: string, descripcion: string): number {
    const regex = /(\d+)%|(\d+)x(\d+)/;
    const titleMatch = titulo.match(regex);
    const descMatch = descripcion.match(regex);

    if (titleMatch && titleMatch[1]) {
      return parseInt(titleMatch[1]);
    } else if (descMatch && descMatch[1]) {
      return parseInt(descMatch[1]);
    } else if (
      (titleMatch || descMatch) &&
      (titleMatch?.[2] || descMatch?.[2])
    ) {
      return 50;
    }

    return 0;
  }

  // Formatea la fecha a formato local español
  private formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  openPromoModal(
    promocion: Promocion & { descuento?: number; imagen?: string }
  ) {
    // Asegura que cines siempre sea un arreglo para evitar errores en la plantilla
    this.selectedPromocion = {
      ...promocion,
      cines: promocion.cines ?? [],
    };
    this.displayModal = true;
  }

  closePromoModal() {
    this.displayModal = false;
  }
}
