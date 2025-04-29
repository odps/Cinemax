import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../core/services/auth.service';
import { UsuarioService } from '../../core/services/usuario.service';
import { Usuario } from '../../core/interfaces/usuario';
import {Card} from 'primeng/card';
import {TableModule} from 'primeng/table';
import {Menu} from 'primeng/menu';
import {Button} from 'primeng/button';
import {Password} from 'primeng/password';
import {DatePipe, NgIf} from '@angular/common';
import {InputText} from 'primeng/inputtext';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  imports: [
    Card,
    TableModule,
    Menu,
    ReactiveFormsModule,
    Button,
    Password,
    DatePipe,
    InputText,
    NgIf
  ],
  providers: [MessageService]
})
export class PerfilComponent implements OnInit {
  userData: Usuario | null = null;
  userId: number = 0;
  userForm: FormGroup;
  passwordForm: FormGroup;
  menuItems: MenuItem[];
  currentSection: string = 'informacion';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private messageService: MessageService
  ) {
    // Inicializar formulario de perfil
    this.userForm = this.fb.group({
      nombre: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      fechaRegistro: [{value: '', disabled: true}],
      rol: [{value: '', disabled: true}]
    });

    // Inicializar formulario de cambio de contraseña
    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });

    // Inicializar menú
    this.menuItems = [
      {
        label: 'Información Personal',
        icon: 'pi pi-user',
        command: () => this.cambiarSeccion('informacion')
      },
      {
        label: 'Seguridad',
        icon: 'pi pi-lock',
        command: () => this.cambiarSeccion('seguridad')
      },
      {
        label: 'Actividad Reciente',
        icon: 'pi pi-history',
        command: () => this.cambiarSeccion('actividad')
      }
    ];
  }

  ngOnInit(): void {
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario(): void {
    this.loading = true;

    // Obtener el ID del usuario del localStorage
    const userIdStr = localStorage.getItem('userId');
    if (userIdStr) {
      this.userId = parseInt(userIdStr, 10);

      this.usuarioService.getUsuarioPorId(this.userId).subscribe({
        next: (usuario) => {
          this.userData = usuario;
          this.userForm.patchValue({
            nombre: usuario.nombre,
            correo: usuario.correo,
            fechaRegistro: new Date(usuario.fechaRegistro).toLocaleDateString(),
            rol: usuario.rol?.nombre || 'Cliente'
          });
          this.loading = false;
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudieron cargar los datos del usuario'
          });
          this.loading = false;
        }
      });
    }
  }

  cambiarSeccion(seccion: string): void {
    this.currentSection = seccion;
  }

  guardarCambios(): void {
    if (this.userForm.valid && this.userId) {
      const datosActualizados = {
        nombre: this.userForm.get('nombre')?.value,
        correo: this.userForm.get('correo')?.value
      };

      this.usuarioService.actualizarUsuario(this.userId, datosActualizados).subscribe({
        next: (response) => {
          // Actualizar los datos en localStorage
          const userData = JSON.parse(localStorage.getItem('userData') || '{}');
          userData.nombre = datosActualizados.nombre;
          userData.correo = datosActualizados.correo;
          localStorage.setItem('userData', JSON.stringify(userData));
          localStorage.setItem('userName', datosActualizados.nombre);
          localStorage.setItem('userEmail', datosActualizados.correo);

          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Perfil actualizado correctamente'
          });

          // Marcar el formulario como "pristine" después de guardar
          this.userForm.markAsPristine();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo actualizar el perfil'
          });
        }
      });
    }
  }

  cambiarContrasena(): void {
    if (this.passwordForm.valid) {
      // Aquí implementarías la lógica para cambiar la contraseña
      // Normalmente harías una llamada a un endpoint de cambio de contraseña

      // Simulación de cambio exitoso
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Contraseña actualizada correctamente'
      });

      // Resetear el formulario
      this.passwordForm.reset();
    }
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }
}
