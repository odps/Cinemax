import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Pelicula } from '../interfaces/pelicula';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  // URL base para las peticiones relacionadas a películas
  private apiUrl = `${environment.apiUrl}/pelicula`;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista completa de películas desde el backend
   */
  getListaPeliculas(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(`${this.apiUrl}/lista`);
  }

  /**
   * Obtiene los detalles de una película específica por su ID
   */
  getPeliculaPorId(id: number): Observable<Pelicula> {
    return this.http.get<Pelicula>(`${this.apiUrl}/${id}`);
  }

  /**
   * Envía una nueva película al backend para su creación
   */
  crearPelicula(pelicula: Pelicula): Observable<Pelicula> {
    return this.http.post<Pelicula>(`${this.apiUrl}/crear`, pelicula);
  }

  /**
   * Actualiza los datos de una película existente.
   * Se utiliza Partial<Pelicula> para permitir la actualización parcial de los campos.
   */
  actualizarPelicula(
    id: number,
    pelicula: Partial<Pelicula>
  ): Observable<Pelicula> {
    return this.http.put<Pelicula>(`${this.apiUrl}/editar/${id}`, pelicula);
  }

  /**
   * Elimina una película del sistema por su ID
   */
  eliminarPelicula(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar/${id}`);
  }

  /**
   * Busca películas filtrando por el nombre del director.
   * Se utiliza encodeURIComponent para asegurar que el nombre del director sea válido en la URL.
   */
  buscarPeliculasPorDirector(director: string): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(
      `${this.apiUrl}/director/${encodeURIComponent(director)}`
    );
  }
}
