import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
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
   * Obtiene la lista completa de cines.
   * El backend responde con un string, por lo que se realiza un parseo manual a JSON.
   * Si ocurre un error al parsear, se retorna un array vacío.
   */
  getListaCines(): Observable<Cine[]> {
    return this.http.get(`${this.apiUrl}/lista`, { responseType: 'text' }).pipe(
      map((response) => {
        try {
          let jsonStr = response.trim();
          return JSON.parse(jsonStr) as Cine[];
        } catch {
          return [];
        }
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Obtiene detalles de un cine por su ID.
   */
  getCinePorId(id: number): Observable<Cine> {
    return this.http.get<Cine>(`${this.apiUrl}/${id}`);
  }

  /**
   * Obtiene cines filtrados por ciudad.
   */
  getCinesPorCiudad(ciudad: string): Observable<Cine[]> {
    return this.http.get<Cine[]>(
      `${this.apiUrl}/ciudad/${encodeURIComponent(ciudad)}`
    );
  }

  /**
   * Crea un nuevo cine.
   */
  crearCine(cine: Cine): Observable<Cine> {
    return this.http.post<Cine>(`${this.apiUrl}/crear`, cine);
  }

  /**
   * Actualiza un cine existente.
   */
  actualizarCine(id: number, cine: Partial<Cine>): Observable<Cine> {
    return this.http.put<Cine>(`${this.apiUrl}/editar/${id}`, cine);
  }

  /**
   * Elimina un cine por su ID.
   */
  eliminarCine(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar/${id}`);
  }

  /**
   * Maneja errores de las peticiones HTTP y los propaga.
   */
  private handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}
