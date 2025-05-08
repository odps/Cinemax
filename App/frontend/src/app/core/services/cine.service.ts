import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Cine } from '../interfaces/cine';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CineService {
  private apiUrl = `${environment.apiUrl}/cine`;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista completa de cines
   */
  getListaCines(): Observable<Cine[]> {
    return this.http.get(`${this.apiUrl}/lista`, { responseType: 'text' }).pipe(
      map((response) => {
        try {
          let jsonStr = response.trim();
          return JSON.parse(jsonStr) as Cine[];
        } catch (error) {
          console.error('Error parsing cines JSON:', error);
          console.log('Raw response:', response);
          return [];
        }
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Obtiene detalles de un cine por su ID
   */
  getCinePorId(id: number): Observable<Cine> {
    return this.http.get<Cine>(`${this.apiUrl}/${id}`);
  }

  /**
   * Obtiene cines por ciudad
   */
  getCinesPorCiudad(ciudad: string): Observable<Cine[]> {
    return this.http.get<Cine[]>(
      `${this.apiUrl}/ciudad/${encodeURIComponent(ciudad)}`
    );
  }

  /**
   * Crea un nuevo cine
   */
  crearCine(cine: Cine): Observable<Cine> {
    return this.http.post<Cine>(`${this.apiUrl}/crear`, cine);
  }

  /**
   * Actualiza un cine existente
   */
  actualizarCine(id: number, cine: Partial<Cine>): Observable<Cine> {
    return this.http.put<Cine>(`${this.apiUrl}/editar/${id}`, cine);
  }

  /**
   * Elimina un cine por su ID
   */
  eliminarCine(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar/${id}`);
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API error:', error);
    return throwError(() => error);
  }
}
