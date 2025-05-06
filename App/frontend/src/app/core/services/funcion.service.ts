import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FuncionService {
  private apiUrl = `${environment.apiUrl}/funcion`;

  constructor(private http: HttpClient) {}

  getFunciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/lista`);
  }

  getFuncionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createFuncion(funcion: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/crear`, funcion);
  }

  updateFuncion(id: number, funcion: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/editar/${id}`, funcion);
  }

  deleteFuncion(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/eliminar/${id}`);
  }

  getFuncionesByPelicula(idPelicula: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pelicula/${idPelicula}`);
  }

  getFuncionesBySala(idSala: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/sala/${idSala}`);
  }
}
