import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { RouterLink, RouterLinkActive } from "@angular/router";
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
export class NavbarComponent implements OnInit, OnDestroy {
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

  private authSubscription: Subscription = new Subscription();
  private userSubscription: Subscription = new Subscription();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      isAuth => this.isAuthenticated = isAuth
    );

    this.userSubscription = this.authService.currentUser$.subscribe(
      user => this.currentUser = user
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
    this.authService.handleAuthResponse(response);
    // Cerrar menú móvil si está abierto
    this.isMenuOpen = false;
  }

  handleRegisterSuccess(response: any) {
    console.log('Usuario registrado:', response);
    this.authService.handleAuthResponse(response);
    // Cerrar menú móvil si está abierto
    this.isMenuOpen = false;
  }
}
