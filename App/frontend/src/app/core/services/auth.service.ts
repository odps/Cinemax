import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  // Sujeto para emitir el estado de autenticación actual
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(
    this.hasValidToken()
  );
  // Sujeto para emitir los datos del usuario actual
  private currentUserSubject = new BehaviorSubject<any>(this.getUserData());

  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.checkAuthStatus();
  }

  // Realiza la petición de login y maneja la respuesta de autenticación
  login(credentials: { correo: string; contrasena: string }): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/login`, credentials)
      .pipe(tap(this.handleAuthResponse.bind(this)));
  }

  // Realiza la petición de registro de usuario
  register(userData: {
    nombre: string;
    correo: string;
    contrasena: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData, {
      responseType: 'text',
    });
  }

  // Cierra la sesión del usuario y limpia el almacenamiento local
  logout(): void {
    this.router.navigate(['landing']);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);
  }

  // Verifica el estado de autenticación y actualiza los sujetos correspondientes
  checkAuthStatus(): void {
    const isAuthenticated = this.hasValidToken();
    const userData = this.getUserData();
    this.isAuthenticatedSubject.next(isAuthenticated);
    if (isAuthenticated && userData) {
      this.currentUserSubject.next(userData);
    }
  }

  // Maneja la respuesta de autenticación, almacenando token y datos de usuario
  handleAuthResponse(response: any): void {
    if (response.token) {
      localStorage.setItem('authToken', response.token);
    }
    if (response.user) {
      const user = response.user;
      localStorage.setItem('userData', JSON.stringify(user));
      localStorage.setItem('userId', user.id.toString());
      localStorage.setItem('userName', user.nombre);
      localStorage.setItem('userEmail', user.correo);
      localStorage.setItem('userRole', user.rol?.nombre || 'CLIENT');
      this.isAuthenticatedSubject.next(true);
      this.currentUserSubject.next(user);
    }
  }

  // Verifica si existe un token de autenticación en el almacenamiento local
  private hasValidToken(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Obtiene los datos del usuario almacenados localmente
  private getUserData(): any {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  // Verifica si el usuario tiene un rol específico
  public hasRole(roleName: string): boolean {
    const user = this.getUserData();
    return !!user?.rol?.nombre && user.rol.nombre === roleName;
  }

  // Verifica si el usuario tiene un permiso específico
  public hasPermission(permissionName: string): boolean {
    const user = this.getUserData();
    return !!user?.rol?.permisos?.some(
      (permiso: any) => permiso.nombre === permissionName
    );
  }
}
