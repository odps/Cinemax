import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    IconField,
    InputIcon
  ]
})
export class AuthModalComponent {
  @Output() loginSuccess = new EventEmitter<any>();
  @Output() registerSuccess = new EventEmitter<any>();

  displayModal = false;
  isRegisterMode = false;

  loginForm = {
    email: '',
    password: ''
  };

  registerForm = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  show(mode: 'login' | 'register' = 'login') {
    this.isRegisterMode = mode === 'register';
    this.displayModal = true;
  }

  hide() {
    this.displayModal = false;
  }

  switchToRegister() {
    this.isRegisterMode = true;
  }

  switchToLogin() {
    this.isRegisterMode = false;
  }

  login() {
    // Implementar lógica de inicio de sesión
    this.loginSuccess.emit(this.loginForm);
    this.hide();
  }

  register() {
    // Implementar lógica de registro
    this.registerSuccess.emit(this.registerForm);
    this.hide();
  }
}
