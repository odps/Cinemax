import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

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
    InputIcon,
    HttpClientModule,
    ToastModule
  ],
  providers: [MessageService]
})
export class AuthModalComponent {
  @Output() loginSuccess = new EventEmitter<any>();
  @Output() registerSuccess = new EventEmitter<any>();

  displayModal = false;
  isRegisterMode = false;
  loading = false;

  loginForm = {
    correo: '',
    contrasena: ''
  };

  registerForm = {
    nombre: '',
    correo: '',
    contrasena: '',
    confirmPassword: ''
  };

  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  show(mode: 'login' | 'register' = 'login') {
    this.isRegisterMode = mode === 'register';
    this.displayModal = true;
  }

  hide() {
    this.displayModal = false;
    this.resetForms();
  }

  switchToRegister() {
    this.isRegisterMode = true;
  }

  switchToLogin() {
    this.isRegisterMode = false;
  }

  resetForms() {
    this.loginForm = { correo: '', contrasena: '' };
    this.registerForm = { nombre: '', correo: '', contrasena: '', confirmPassword: '' };
  }

  login() {
    if (!this.loginForm.correo || !this.loginForm.contrasena) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor completa todos los campos'
      });
      return;
    }

    this.loading = true;
    this.authService.login(this.loginForm).subscribe({
      next: (response) => {
        this.loading = false;
        this.loginSuccess.emit(response);
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Inicio de sesión exitoso'
        });
        this.hide();
      },
      error: (error) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error?.message || 'Error al iniciar sesión'
        });
      }
    });
  }

register() {
  if (this.registerForm.contrasena !== this.registerForm.confirmPassword) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Las contraseñas no coinciden'
    });
    return;
  }

  if (!this.registerForm.nombre || !this.registerForm.correo || !this.registerForm.contrasena) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Por favor completa todos los campos'
    });
    return;
  }

  const registerData = {
    nombre: this.registerForm.nombre,
    correo: this.registerForm.correo,
    contrasena: this.registerForm.contrasena
  };

  this.loading = true;
  this.authService.register(registerData).subscribe({
    next: (response) => {
      this.loading = false;
      // Después del registro exitoso, iniciar sesión automáticamente
      this.authService.login({
        correo: this.registerForm.correo,
        contrasena: this.registerForm.contrasena
      }).subscribe({
        next: (loginResponse) => {
          this.registerSuccess.emit(loginResponse);
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Registro exitoso'
          });
          this.hide();
        },
        error: (loginError) => {
          this.messageService.add({
            severity: 'warning',
            summary: 'Atención',
            detail: 'Usuario registrado pero no se pudo iniciar sesión automáticamente'
          });
          this.switchToLogin();
        }
      });
    },
    error: (error) => {
      this.loading = false;
      let errorMessage = 'Error al registrarse';

      if (error.error === 'Email ya registrado') {
        errorMessage = 'Este correo ya está registrado';
      }

      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: errorMessage
      });
    }
  });
}
}
