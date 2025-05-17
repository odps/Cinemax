import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Factura } from '../interfaces/factura';

@Injectable({
  providedIn: 'root',
})
export class FacturaService {
  // URL base para las peticiones relacionadas con facturas
  private apiUrl = `${environment.apiUrl}/factura`;

  constructor(private http: HttpClient) {}

  // Obtiene todas las facturas registradas
  getAllFacturas(): Observable<Factura[]> {
    return this.http.get<Factura[]>(`${this.apiUrl}/lista`);
  }

  // Busca una factura específica por su ID
  getFacturaById(id: number): Observable<Factura> {
    return this.http.get<Factura>(`${this.apiUrl}/${id}`);
  }

  // Crea una nueva factura con los datos proporcionados
  createFactura(factura: Partial<Factura>): Observable<Factura> {
    return this.http.post<Factura>(`${this.apiUrl}/crear`, factura);
  }

  // Actualiza una factura existente identificada por su ID
  updateFactura(id: number, factura: Partial<Factura>): Observable<Factura> {
    return this.http.put<Factura>(`${this.apiUrl}/editar/${id}`, factura);
  }

  // Elimina una factura por su ID
  deleteFactura(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar/${id}`);
  }

  // Obtiene todas las facturas asociadas a un usuario específico
  getFacturasByUsuarioId(usuarioId: number): Observable<Factura[]> {
    return this.http.get<Factura[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }

  // Filtra facturas por su estado (por ejemplo: pagada, pendiente, etc.)
  getFacturasByEstado(estado: string): Observable<Factura[]> {
    return this.http.get<Factura[]>(`${this.apiUrl}/estado/${estado}`);
  }
}
