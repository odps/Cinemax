import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Asiento } from '../interfaces/asiento';

@Injectable({
  providedIn: 'root',
})
export class AsientoService {
  // URL base para las peticiones relacionadas con asientos
  private apiUrl = `${environment.apiUrl}/asiento`;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista completa de asientos desde el backend
   */
  getListaAsientos(): Observable<Asiento[]> {
    return this.http.get<Asiento[]>(`${this.apiUrl}/lista`);
  }

  /**
   * Obtiene los detalles de un asiento específico por su ID
   */
  getAsientoPorId(id: number): Observable<Asiento> {
    return this.http.get<Asiento>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crea un nuevo asiento enviando el objeto asiento al backend
   */
  crearAsiento(asiento: Asiento): Observable<Asiento> {
    return this.http.post<Asiento>(`${this.apiUrl}/crear`, asiento);
  }

  /**
   * Actualiza los datos de un asiento existente identificado por su ID.
   * Se utiliza Partial<Asiento> para permitir actualizar solo algunos campos.
   */
  actualizarAsiento(
    id: number,
    asiento: Partial<Asiento>
  ): Observable<Asiento> {
    return this.http.put<Asiento>(`${this.apiUrl}/editar/${id}`, asiento);
  }

  /**
   * Elimina un asiento específico por su ID
   */
  eliminarAsiento(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar/${id}`);
  }

  /**
   * Obtiene todos los asientos asociados a una sala específica por su ID
   */
  getAsientosPorSalaId(idSala: number): Observable<Asiento[]> {
    return this.http.get<Asiento[]>(`${this.apiUrl}/sala/${idSala}`);
  }
}
