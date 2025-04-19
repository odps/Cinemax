import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';

interface Promocion {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  fechaInicio: string;
  fechaFin: string;
  descuento: number;
  tipo: 'combo' | 'descuento' | 'especial';
  destacada?: boolean;
}

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
  promocionDestacada!: Promocion;
  promociones: Promocion[] = [];

  ngOnInit(): void {
    this.cargarPromociones();
  }

  cargarPromociones(): void {
    // Simulación de datos - en un caso real, estos datos vendrían de un servicio
    this.promociones = [
      {
        id: 1,
        titulo: '2x1 en Entradas',
        descripcion: 'Compra una entrada y lleva otra gratis para cualquier película de lunes a jueves.',
        imagen: 'assets/images/promo-2x1.jpg',
        fechaInicio: '01/06/2024',
        fechaFin: '30/06/2024',
        descuento: 50,
        tipo: 'combo',
        destacada: true
      },
      {
        id: 2,
        titulo: 'Combo Familiar',
        descripcion: '4 entradas + 2 palomitas grandes + 4 refrescos medianos por un precio especial.',
        imagen: 'assets/images/promo-familia.jpg',
        fechaInicio: '01/06/2024',
        fechaFin: '30/07/2024',
        descuento: 25,
        tipo: 'combo'
      },
      {
        id: 3,
        titulo: 'Descuento Estudiantes',
        descripcion: '30% de descuento en entradas presentando credencial de estudiante.',
        imagen: 'assets/images/promo-estudiante.jpg',
        fechaInicio: '01/06/2024',
        fechaFin: '31/12/2024',
        descuento: 30,
        tipo: 'descuento'
      },
      {
        id: 4,
        titulo: 'Miércoles de Cine',
        descripcion: 'Todos los miércoles entradas a mitad de precio.',
        imagen: 'assets/images/promo-miercoles.jpg',
        fechaInicio: '01/01/2024',
        fechaFin: '31/12/2024',
        descuento: 50,
        tipo: 'descuento'
      },
      {
        id: 5,
        titulo: 'Noche Premier',
        descripcion: 'Asiste a los estrenos exclusivos con precio especial.',
        imagen: 'assets/images/promo-premier.jpg',
        fechaInicio: '15/06/2024',
        fechaFin: '15/06/2024',
        descuento: 0,
        tipo: 'especial'
      }
    ];

    this.promocionDestacada = this.promociones.find(p => p.destacada) || this.promociones[0];
  }
}
