import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Factura } from '../interfaces/factura';

@Injectable({
  providedIn: 'root',
})
export class FacturaService {
  private apiUrl = `${environment.apiUrl}/factura`;

  constructor(private http: HttpClient) {}

  getAllFacturas(): Observable<Factura[]> {
    return this.http.get<Factura[]>(`${this.apiUrl}/lista`);
  }

  getFacturaById(id: number): Observable<Factura> {
    return this.http.get<Factura>(`${this.apiUrl}/${id}`);
  }

  createFactura(factura: Partial<Factura>): Observable<Factura> {
    return this.http.post<Factura>(`${this.apiUrl}/crear`, factura);
  }

  updateFactura(id: number, factura: Partial<Factura>): Observable<Factura> {
    return this.http.put<Factura>(`${this.apiUrl}/editar/${id}`, factura);
  }

  deleteFactura(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar/${id}`);
  }

  getFacturasByUsuarioId(usuarioId: number): Observable<Factura[]> {
    return this.http.get<Factura[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }

  getFacturasByEstado(estado: string): Observable<Factura[]> {
    return this.http.get<Factura[]>(`${this.apiUrl}/estado/${estado}`);
  }
}
