import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Promocion } from '../interfaces/promocion';

@Injectable({
  providedIn: 'root'
})
export class PromocionService {
  private apiUrl = `${environment.apiUrl}/promocion`;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene la lista completa de promociones
   */
  getPromociones(): Observable<Promocion[]> {
    return this.http.get<Promocion[]>(`${this.apiUrl}/lista`);
  }

  /**
   * Obtiene detalles de una promoción por su ID
   */
  getPromocionPorId(id: number): Observable<Promocion> {
    return this.http.get<Promocion>(`${this.apiUrl}/${id}`);
  }

  /**
   * Obtiene las promociones activas actualmente
   */
  getPromocionesActivas(): Observable<Promocion[]> {
    return this.http.get<Promocion[]>(`${this.apiUrl}/activas`);
  }

  /**
   * Obtiene promociones por tipo
   */
  getPromocionesPorTipo(tipo: string): Observable<Promocion[]> {
    return this.http.get<Promocion[]>(`${this.apiUrl}/tipo/${encodeURIComponent(tipo)}`);
  }

  /**
   * Obtiene promociones por cine
   */
  getPromocionesPorCine(idCine: number): Observable<Promocion[]> {
    return this.http.get<Promocion[]>(`${this.apiUrl}/cine/${idCine}`);
  }

  /**
   * Crea una nueva promoción (requiere admin)
   */
  crearPromocion(promocion: Promocion): Observable<Promocion> {
    return this.http.post<Promocion>(`${this.apiUrl}/crear`, promocion);
  }

  /**
   * Actualiza una promoción existente (requiere admin)
   */
  actualizarPromocion(id: number, promocion: Promocion): Observable<Promocion> {
    return this.http.put<Promocion>(`${this.apiUrl}/editar/${id}`, promocion);
  }

  /**
   * Elimina una promoción por su ID (requiere admin)
   */
  eliminarPromocion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar/${id}`);
  }

  /**
   * Asigna un cine a una promoción (requiere admin)
   */
  asignarCineAPromocion(idPromocion: number, idCine: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${idPromocion}/cine/${idCine}`, {});
  }

  /**
   * Elimina un cine de una promoción (requiere admin)
   */
  eliminarCineDePromocion(idPromocion: number, idCine: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${idPromocion}/cine/${idCine}`);
  }
}
