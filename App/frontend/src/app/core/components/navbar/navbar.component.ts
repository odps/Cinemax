import { Component } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [CommonModule, ButtonModule, InputTextModule, IconFieldModule, InputIcon, NgOptimizedImage, RouterLink, RouterLinkActive]
})

export class NavbarComponent {
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
}
