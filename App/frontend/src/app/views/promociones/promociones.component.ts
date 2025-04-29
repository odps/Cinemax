import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
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
    DividerModule
  ],
  templateUrl: './promociones.component.html',
  styleUrl: './promociones.component.css'
})
export class PromocionesComponent implements OnInit {
  promocionDestacada!: Promocion & { descuento?: number, imagen?: string };
  promociones: Array<Promocion & { descuento?: number, imagen?: string }> = [];
  loading: boolean = false;
  error: string | null = null;
  protected readonly assetsLocation = assetsLocation;

  constructor(private promocionService: PromocionService) {}

  ngOnInit(): void {
    this.cargarPromociones();
  }

  cargarPromociones(): void {
    this.loading = true;
    this.error = null;

    this.promocionService.getPromocionesActivas().pipe(
      catchError(err => {
        this.error = 'Error al cargar las promociones: ' + err.message;
        this.loading = false;
        return of([]);
      })
    ).subscribe((data: any) => {
      this.loading = false;
      if (data && data.length > 0) {
        this.promociones = data.map((promo: Promocion) => {
          return {
            ...promo,
            descuento: this.extraerDescuento(promo.titulo, promo.descripcion),
            imagen: `${assetsLocation.assetUrl}/${promo.imagenUrl || 'promocion-placeholder.jpg'}`
          };
        });

        const randomIndex = Math.floor(Math.random() * this.promociones.length);
        this.promociones[randomIndex].destacada = true;
        this.promocionDestacada = this.promociones[randomIndex];
      } else {
        this.cargarPromocionesFallback();
      }
    });
  }

  private extraerDescuento(titulo: string, descripcion: string): number {
    const regex = /(\d+)%|(\d+)x(\d+)/;
    const titleMatch = titulo.match(regex);
    const descMatch = descripcion.match(regex);

    if (titleMatch && titleMatch[1]) {
      return parseInt(titleMatch[1]);
    } else if (descMatch && descMatch[1]) {
      return parseInt(descMatch[1]);
    } else if ((titleMatch || descMatch) && (titleMatch?.[2] || descMatch?.[2])) {
      return 50;
    }

    return 0;
  }

  private formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  private cargarPromocionesFallback(): void {
    this.promociones = [
      {
        id: 1,
        titulo: '2x1 en Entradas',
        descripcion: 'Compra una entrada y lleva otra gratis para cualquier película de lunes a jueves.',
        tipo: 'combo',
        fechaInicio: '01/06/2024',
        fechaFin: '30/06/2024',
        imagenUrl: 'promo-2x1.jpg',
        imagen: `${assetsLocation.assetUrl}/promo-2x1.jpg`,
        descuento: 50,
        destacada: true
      }
    ];

    this.promocionDestacada = this.promociones.find(p => p.destacada) || this.promociones[0];
  }
}
