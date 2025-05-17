import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DispoAsientoService } from './dispoAsiento.service';
import { DisponibilidadAsiento } from '../interfaces/disponibilidad-asiento';

@Injectable({
  providedIn: 'root',
})
export class FuncionService {
  private apiUrl = `${environment.apiUrl}/funcion`;

  constructor(
    private http: HttpClient,
    private dispoAsientoService: DispoAsientoService
  ) {}

  // Obtiene todas las funciones
  getFunciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/lista`);
  }

  // Obtiene una función por su ID
  getFuncionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Crea una nueva función
  createFuncion(funcion: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/crear`, funcion);
  }

  // Actualiza una función existente
  updateFuncion(id: number, funcion: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/editar/${id}`, funcion);
  }

  // Elimina una función por su ID
  deleteFuncion(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/eliminar/${id}`);
  }

  // Obtiene funciones por el ID de la película
  getFuncionesByPelicula(idPelicula: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pelicula/${idPelicula}`);
  }

  // Obtiene funciones por el ID de la sala
  getFuncionesBySala(idSala: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/sala/${idSala}`);
  }

  // Obtiene la disponibilidad de asientos para una función específica
  getDisponibilidadAsientosByFuncionId(
    funcionId: number
  ): Observable<DisponibilidadAsiento[]> {
    return this.dispoAsientoService.getDisponibilidadesPorFuncionId(funcionId);
  }
}
