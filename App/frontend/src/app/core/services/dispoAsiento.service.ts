import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DisponibilidadAsiento } from '../interfaces/disponibilidad-asiento';

@Injectable({
  providedIn: 'root',
})
export class DispoAsientoService {
  private apiUrl = `${environment.apiUrl}/dispo-asiento`;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista completa de disponibilidades de asientos
   */
  getListaDisponibilidades(): Observable<DisponibilidadAsiento[]> {
    return this.http.get<DisponibilidadAsiento[]>(`${this.apiUrl}/lista`);
  }

  /**
   * Obtiene detalles de una disponibilidad de asiento por su ID
   */
  getDisponibilidadPorId(id: number): Observable<DisponibilidadAsiento> {
    return this.http.get<DisponibilidadAsiento>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crea una nueva disponibilidad de asiento
   */
  crearDisponibilidad(
    disponibilidad: DisponibilidadAsiento
  ): Observable<DisponibilidadAsiento> {
    return this.http.post<DisponibilidadAsiento>(
      `${this.apiUrl}/crear`,
      disponibilidad
    );
  }

  /**
   * Actualiza una disponibilidad de asiento existente
   */
  actualizarDisponibilidad(
    id: number,
    disponibilidad: Partial<DisponibilidadAsiento>
  ): Observable<DisponibilidadAsiento> {
    return this.http.put<DisponibilidadAsiento>(
      `${this.apiUrl}/editar/${id}`,
      disponibilidad
    );
  }

  /**
   * Elimina una disponibilidad de asiento por su ID
   */
  eliminarDisponibilidad(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar/${id}`);
  }

  /**
   * Obtiene disponibilidades de asiento por el ID del asiento
   */
  getDisponibilidadesPorAsientoId(
    idAsiento: number
  ): Observable<DisponibilidadAsiento[]> {
    return this.http.get<DisponibilidadAsiento[]>(
      `${this.apiUrl}/asiento/${idAsiento}`
    );
  }

  /**
   * Obtiene disponibilidades de asiento por el ID de la función
   */
  getDisponibilidadesPorFuncionId(
    idFuncion: number
  ): Observable<DisponibilidadAsiento[]> {
    return this.http.get<DisponibilidadAsiento[]>(
      `${this.apiUrl}/funcion/${idFuncion}`
    );
  }
}
