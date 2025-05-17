import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  // URL base para las peticiones relacionadas a tickets
  private apiUrl = `${environment.apiUrl}/ticket`;

  constructor(private http: HttpClient) {}

  getAllTickets(): Observable<any> {
    return this.http.get(`${this.apiUrl}/lista`);
  }

  getTicketById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createTicket(ticket: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear`, ticket);
  }

  updateTicket(id: number, ticket: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/editar/${id}`, ticket);
  }

  deleteTicket(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar/${id}`);
  }

  getTicketsByUserId(usuarioId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuario/${usuarioId}`);
  }

  getTicketsByFuncionId(funcionId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/funcion/${funcionId}`);
  }

  /**
   * Realiza la compra de un ticket y retorna tanto el ticket como la factura generada.
   * El backend responde con ambos objetos en una sola petición.
   */
  comprarTicket(ticket: any): Observable<{ ticket: any; factura: any }> {
    return this.http.post<{ ticket: any; factura: any }>(
      `${this.apiUrl}/comprar`,
      ticket
    );
  }
}
