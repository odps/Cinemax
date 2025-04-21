import {Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthModalComponent } from '../auth-modal/auth-modal.component';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    IconFieldModule,
    InputIcon,
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive,
    AuthModalComponent,
    MenuModule
  ]
})
export class NavbarComponent implements OnInit{
  @ViewChild(AuthModalComponent) authModal!: AuthModalComponent;

  isAuthenticated = false;
  currentUser: any = null;

  isMenuOpen = false;
  isSearchOpen = false;

  userMenuItems: MenuItem[] = [
    {
      label: 'Mi perfil',
      icon: 'pi pi-user',
      routerLink: '/perfil'
    },
    {
      label: 'Mis tickets',
      icon: 'pi pi-ticket',
      routerLink: '/mis-tickets'
    },
    {
      label: 'Cerrar sesión',
      icon: 'pi pi-sign-out',
      command: () => this.logout()
    }
  ];

  ngOnInit() {
    this.checkAuthStatus();
  }

  checkAuthStatus() {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');

    this.isAuthenticated = !!token && !!userData;

    if (this.isAuthenticated && userData) {
      this.currentUser = JSON.parse(userData);
    }
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');

    this.isAuthenticated = false;
    this.currentUser = null;
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
  }

  onSearchBlur() {
    this.isSearchOpen = false;
  }

  showLoginModal() {
    this.authModal.show('login');
  }

  handleLoginSuccess(response: any) {
    console.log('Usuario logueado:', response);

    // Guardar token en localStorage
    if (response.token) {
      localStorage.setItem('authToken', response.token);
    }

    // Guardar información del usuario
    if (response.user) {
      localStorage.setItem('userData', JSON.stringify(response.user));

      // También puedes guardar datos específicos para acceso rápido
      const user = response.user;
      localStorage.setItem('userId', user.id.toString());
      localStorage.setItem('userName', user.nombre);
      localStorage.setItem('userEmail', user.correo);
      localStorage.setItem('userRole', user.rol?.nombre || 'CLIENT');

      // Actualizar el estado de autenticación y usuario actual
      this.isAuthenticated = true;
      this.currentUser = user;

      // Cerrar menú móvil si está abierto
      this.isMenuOpen = false;
    }
  }

  handleRegisterSuccess(response: any) {
    console.log('Usuario registrado:', response);

    // Similar a login ya que la API devuelve la misma estructura
    if (response.token) {
      localStorage.setItem('authToken', response.token);
    }

    if (response.user) {
      localStorage.setItem('userData', JSON.stringify(response.user));

      const user = response.user;
      localStorage.setItem('userId', user.id.toString());
      localStorage.setItem('userName', user.nombre);
      localStorage.setItem('userEmail', user.correo);
      localStorage.setItem('userRole', user.rol?.nombre || 'CLIENT');

      // Actualizar el estado de autenticación y usuario actual
      this.isAuthenticated = true;
      this.currentUser = user;

      // Cerrar menú móvil si está abierto
      this.isMenuOpen = false;
    }
  }

}
