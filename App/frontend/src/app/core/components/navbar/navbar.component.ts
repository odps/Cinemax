import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  HostListener,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive,
    AuthModalComponent,
    MenuModule,
  ],
})
export class NavbarComponent implements OnInit, OnDestroy {
  @ViewChild(AuthModalComponent) authModal!: AuthModalComponent;

  isAuthenticated = false;
  currentUser: any = null;

  isMenuOpen = false;

  // Opciones del menú de usuario (perfil y cerrar sesión)
  userMenuItems: MenuItem[] = [
    {
      label: 'Mi perfil',
      icon: 'pi pi-user',
      routerLink: '/perfil',
    },
    {
      label: 'Cerrar sesión',
      icon: 'pi pi-sign-out',
      command: () => this.logout(),
    },
  ];

  private authSubscription: Subscription = new Subscription();
  private userSubscription: Subscription = new Subscription();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Suscripción al estado de autenticación
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      (isAuth) => (this.isAuthenticated = isAuth)
    );
    // Suscripción al usuario actual
    this.userSubscription = this.authService.currentUser$.subscribe(
      (user) => (this.currentUser = user)
    );
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  showLoginModal() {
    this.authModal.show('login');
  }

  // Maneja el evento de login exitoso y cierra el menú móvil si está abierto
  handleLoginSuccess(response: any) {
    this.authService.handleAuthResponse(response);
    this.isMenuOpen = false;
  }

  // Maneja el evento de registro exitoso y cierra el menú móvil si está abierto
  handleRegisterSuccess(response: any) {
    this.authService.handleAuthResponse(response);
    this.isMenuOpen = false;
  }

  // Verifica si el usuario tiene rol de administrador
  hasAdminRole(): boolean {
    return this.currentUser?.rol?.nombre === 'ADMIN';
  }

  // Devuelve el nombre del usuario para mostrar en la barra
  get userName(): string {
    return (
      this.currentUser?.nombre ||
      this.currentUser?.name ||
      this.currentUser?.correo ||
      'Usuario'
    );
  }

  // Devuelve true si el usuario es administrador
  get isAdmin(): boolean {
    return this.hasAdminRole();
  }

  // Abre el modal de autenticación (login o registro)
  openAuthModal(mode: 'login' | 'register' = 'login') {
    this.authModal?.show(mode);
  }

  // Cierra el menú móvil si la pantalla es mayor o igual a 768px
  @HostListener('window:resize', [])
  onResize() {
    if (window.innerWidth >= 768 && this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }
}
