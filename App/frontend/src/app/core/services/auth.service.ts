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
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(
    this.hasValidToken()
  );
  private currentUserSubject = new BehaviorSubject<any>(this.getUserData());

  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.checkAuthStatus();
  }

  login(credentials: { correo: string; contrasena: string }): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/login`, credentials)
      .pipe(tap(this.handleAuthResponse.bind(this)));
  }

  register(userData: {
    nombre: string;
    correo: string;
    contrasena: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData, {
      responseType: 'text',
    });
  }

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

  checkAuthStatus(): void {
    const isAuthenticated = this.hasValidToken();
    const userData = this.getUserData();

    this.isAuthenticatedSubject.next(isAuthenticated);
    if (isAuthenticated && userData) {
      this.currentUserSubject.next(userData);
    }
  }

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

  private hasValidToken(): boolean {
    return !!localStorage.getItem('authToken');
  }

  private getUserData(): any {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }
}
