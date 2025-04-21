import { Component, ViewChild } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthModalComponent } from '../auth-modal/auth-modal.component';

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
    AuthModalComponent
  ]
})
export class NavbarComponent {
  @ViewChild(AuthModalComponent) authModal!: AuthModalComponent;

  isMenuOpen = false;
  isSearchOpen = false;

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

  handleLoginSuccess(userData: any) {
    console.log('Usuario logueado:', userData);
    // Implementar lógica post-login (guardar en localStorage, etc)
  }

  handleRegisterSuccess(userData: any) {
    console.log('Usuario registrado:', userData);
    // Implementar lógica post-registro
  }
}
