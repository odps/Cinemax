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
   * Actualiza una disponibilidad de asiento existente.
   * Se utiliza Partial para permitir actualizar solo algunos campos.
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
   * Obtiene todas las disponibilidades asociadas a un asiento específico
   */
  getDisponibilidadesPorAsientoId(
    idAsiento: number
  ): Observable<DisponibilidadAsiento[]> {
    return this.http.get<DisponibilidadAsiento[]>(
      `${this.apiUrl}/asiento/${idAsiento}`
    );
  }

  /**
   * Obtiene todas las disponibilidades asociadas a una función específica
   */
  getDisponibilidadesPorFuncionId(
    idFuncion: number
  ): Observable<DisponibilidadAsiento[]> {
    return this.http.get<DisponibilidadAsiento[]>(
      `${this.apiUrl}/funcion/${idFuncion}`
    );
  }

  /**
   * Realiza la reserva temporal de un asiento por un tiempo determinado (en minutos).
   * El backend se encarga de bloquear el asiento durante el tiempo especificado.
   */
  reservarAsiento(
    idDisponibilidad: number,
    minutosBloqueo: number = 10
  ): Observable<DisponibilidadAsiento> {
    return this.http.post<DisponibilidadAsiento>(
      `${this.apiUrl}/reservar/${idDisponibilidad}?minutosBloqueo=${minutosBloqueo}`,
      {}
    );
  }

  /**
   * Libera un asiento previamente reservado.
   * El backend desbloquea el asiento para que pueda ser reservado nuevamente.
   */
  liberarAsiento(idDisponibilidad: number): Observable<DisponibilidadAsiento> {
    return this.http.post<DisponibilidadAsiento>(
      `${this.apiUrl}/liberar/${idDisponibilidad}`,
      {}
    );
  }
}
