import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {Pelicula} from '../interfaces/pelicula';


@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  private apiUrl = `${environment.apiUrl}/pelicula`;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene la lista completa de películas
   */
  getListaPeliculas(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(`${this.apiUrl}/lista`);
  }

  /**
   * Obtiene detalles de una película por su ID
   */
  getPeliculaPorId(id: number): Observable<Pelicula> {
    return this.http.get<Pelicula>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crea una nueva película
   */
  crearPelicula(pelicula: Pelicula): Observable<Pelicula> {
    return this.http.post<Pelicula>(`${this.apiUrl}/crear`, pelicula);
  }

  /**
   * Actualiza una película existente
   */
  actualizarPelicula(id: number, pelicula: Partial<Pelicula>): Observable<Pelicula> {
    return this.http.put<Pelicula>(`${this.apiUrl}/editar/${id}`, pelicula);
  }

  /**
   * Elimina una película por su ID
   */
  eliminarPelicula(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar/${id}`);
  }

  /**
   * Busca películas por director
   */
  buscarPeliculasPorDirector(director: string): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(`${this.apiUrl}/director/${encodeURIComponent(director)}`);
  }
}
