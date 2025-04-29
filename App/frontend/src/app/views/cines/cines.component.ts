import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CineCardComponent } from '../../core/components/cine-card/cine-card.component';
import { CineService } from '../../core/services/cine.service';
import { Cine } from '../../core/interfaces/cine';

@Component({
  selector: 'app-cines',
  standalone: true,
  imports: [CommonModule, ButtonModule, CineCardComponent],
  templateUrl: './cines.component.html',
  styleUrl: './cines.component.css'
})
export class CinesComponent implements OnInit {
  cines: Cine[] = [];
  cineDestacado: Cine | undefined;

  constructor(private cineService: CineService) {}

  ngOnInit(): void {
    this.cargarCines();
  }

  cargarCines(): void {
    this.cineService.getListaCines().subscribe({
      next: (data) => {
        this.cines = data;
        // Asumimos que el primer cine es el destacado
        if (data.length > 0) {
          this.cineDestacado = data[0];
        }
      },
      error: (error) => {
        console.error('Error al cargar los cines', error);
      }
    });
  }
}
