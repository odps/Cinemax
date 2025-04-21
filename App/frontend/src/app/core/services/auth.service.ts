import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  login(credentials: { correo: string, contrasena: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  register(userData: { nombre: string, correo: string, contrasena: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData, { responseType: 'text' });
  }
}
