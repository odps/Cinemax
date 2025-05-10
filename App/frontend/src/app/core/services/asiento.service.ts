import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Asiento } from '../interfaces/asiento';

@Injectable({
  providedIn: 'root',
})
export class AsientoService {
  private apiUrl = `${environment.apiUrl}/asiento`;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista completa de asientos
   */
  getListaAsientos(): Observable<Asiento[]> {
    return this.http.get<Asiento[]>(`${this.apiUrl}/lista`);
  }

  /**
   * Obtiene detalles de un asiento por su ID
   */
  getAsientoPorId(id: number): Observable<Asiento> {
    return this.http.get<Asiento>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crea un nuevo asiento
   */
  crearAsiento(asiento: Asiento): Observable<Asiento> {
    return this.http.post<Asiento>(`${this.apiUrl}/crear`, asiento);
  }

  /**
   * Actualiza un asiento existente
   */
  actualizarAsiento(
    id: number,
    asiento: Partial<Asiento>
  ): Observable<Asiento> {
    return this.http.put<Asiento>(`${this.apiUrl}/editar/${id}`, asiento);
  }

  /**
   * Elimina un asiento por su ID
   */
  eliminarAsiento(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar/${id}`);
  }

  /**
   * Obtiene asientos por el ID de la sala
   */
  getAsientosPorSalaId(idSala: number): Observable<Asiento[]> {
    return this.http.get<Asiento[]>(`${this.apiUrl}/sala/${idSala}`);
  }
}
