import { Component } from '@angular/core';
import { CineService } from '../../core/services/cine.service';
import { FuncionService } from '../../core/services/funcion.service';
import { PeliculasService } from '../../core/services/peliculas.service';
import { PromocionService } from '../../core/services/promocion.service';
import { SalaService } from '../../core/services/sala.service';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  constructor(
    private cineService: CineService,
    private salaService: SalaService,
    private funcionService: FuncionService,
    private peliculaService: PeliculasService,
    private promocionesService: PromocionService
  ) {}
}
