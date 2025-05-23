import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Sala } from '../interfaces/sala';
import { Asiento } from '../interfaces/asiento';
import { AsientoService } from './asiento.service';

@Injectable({
  providedIn: 'root',
})
export class SalaService {
  // URL base para las peticiones relacionadas a salas
  private apiUrl = `${environment.apiUrl}/sala`;

  constructor(
    private http: HttpClient,
    private asientoService: AsientoService
  ) {}

  /**
   * Obtiene la lista completa de salas
   */
  getListaSalas(): Observable<Sala[]> {
    return this.http.get<Sala[]>(`${this.apiUrl}/lista`);
  }

  /**
   * Obtiene detalles de una sala por su ID
   */
  getSalaPorId(id: number): Observable<Sala> {
    return this.http.get<Sala>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crea una nueva sala
   */
  crearSala(sala: Sala): Observable<Sala> {
    return this.http.post<Sala>(`${this.apiUrl}/crear`, sala);
  }

  /**
   * Actualiza una sala existente. Se permite actualización parcial de campos.
   */
  actualizarSala(id: number, sala: Partial<Sala>): Observable<Sala> {
    return this.http.put<Sala>(`${this.apiUrl}/editar/${id}`, sala);
  }

  /**
   * Elimina una sala por su ID
   */
  eliminarSala(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar/${id}`);
  }

  /**
   * Obtiene todas las salas asociadas a un cine específico
   */
  getSalasPorCine(idCine: number): Observable<Sala[]> {
    return this.http.get<Sala[]>(`${this.apiUrl}/cine/${idCine}`);
  }

  /**
   * Devuelve los asientos de una sala usando el servicio de asientos.
   * Este método delega la obtención de asientos al servicio correspondiente.
   */
  getAsientosBySalaId(salaId: number): Observable<Asiento[]> {
    return this.asientoService.getAsientosPorSalaId(salaId);
  }
}
