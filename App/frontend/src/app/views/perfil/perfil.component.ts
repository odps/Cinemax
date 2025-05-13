import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../core/services/auth.service';
import { UsuarioService } from '../../core/services/usuario.service';
import { Usuario } from '../../core/interfaces/usuario';
import { Card } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { Menu } from 'primeng/menu';
import { Button } from 'primeng/button';
import { Password } from 'primeng/password';
import { DatePipe, NgIf, CommonModule, CurrencyPipe } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import { FacturaService } from '../../core/services/factura.service';
import { Factura } from '../../core/interfaces/factura';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  imports: [
    CommonModule,
    Card,
    TableModule,
    Menu,
    ReactiveFormsModule,
    Button,
    Password,
    DatePipe,
    CurrencyPipe,
    InputText,
    NgIf,
  ],
  providers: [MessageService],
})
export class PerfilComponent implements OnInit {
  userData: Usuario | null = null;
  userId: number = 0;
  userForm: FormGroup;
  passwordForm: FormGroup;
  menuItems: MenuItem[];
  currentSection: string = 'informacion';
  loading: boolean = false;
  facturas: Factura[] = [];
  comprasLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private facturaService: FacturaService
  ) {
    // Inicializar formulario de perfil
    this.userForm = this.fb.group({
      nombre: [{ value: '', disabled: false }, [Validators.required]],
      correo: [
        { value: '', disabled: false },
        [Validators.required, Validators.email],
      ],
      fechaRegistro: [{ value: '', disabled: true }],
      rol: [{ value: '', disabled: true }],
    });

    // Inicializar formulario de cambio de contraseña
    this.passwordForm = this.fb.group(
      {
        currentPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );

    // Inicializar menú
    this.menuItems = [
      {
        label: 'Información Personal',
        icon: 'pi pi-user',
        styleClass: 'text-gray-300',
        command: () => this.cambiarSeccion('informacion'),
      },
      {
        label: 'Seguridad',
        icon: 'pi pi-shield',
        styleClass: 'text-gray-300',
        command: () => this.cambiarSeccion('seguridad'),
      },
      {
        label: 'Actividad Reciente',
        icon: 'pi pi-history',
        styleClass: 'text-gray-300',
        command: () => this.cambiarSeccion('actividad'),
      },
      {
        label: 'Compras',
        icon: 'pi pi-shopping-bag',
        styleClass: 'text-gray-300',
        command: () => this.cambiarSeccion('compras'),
      },
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

      this.usuarioService.getMiPerfil().subscribe({
        next: (usuario) => {
          this.userData = usuario;

          // Formatear correctamente la fecha y asegurar que se muestre el rol
          this.userForm.patchValue({
            nombre: usuario.nombre,
            correo: usuario.correo,
            fechaRegistro: usuario.fechaRegistro,
            rol: usuario.rol?.nombre || 'Cliente',
          });

          this.loading = false;
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudieron cargar los datos del usuario',
          });
          this.loading = false;
        },
      });
    }
  }

  cambiarSeccion(seccion: string): void {
    this.currentSection = seccion;
    if (seccion === 'compras') {
      this.cargarFacturasUsuario();
    }
  }

  cargarFacturasUsuario(): void {
    this.comprasLoading = true;
    const userIdStr = localStorage.getItem('userId');
    if (userIdStr) {
      const userId = parseInt(userIdStr, 10);
      this.facturaService.getFacturasByUsuarioId(userId).subscribe({
        next: (facturas) => {
          this.facturas = facturas;
          this.comprasLoading = false;
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudieron cargar las facturas del usuario',
          });
          this.comprasLoading = false;
        },
      });
    } else {
      this.comprasLoading = false;
    }
  }

  guardarCambios(): void {
    if (this.userForm.valid) {
      const datosActualizados = {
        nombre: this.userForm.get('nombre')?.value,
        correo: this.userForm.get('correo')?.value,
      };

      this.usuarioService.actualizarMiPerfil(datosActualizados).subscribe({
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
            detail: 'Perfil actualizado correctamente',
          });

          this.userForm.markAsPristine();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo actualizar el perfil',
          });
        },
      });
    }
  }

  cambiarContrasena(): void {
    if (this.passwordForm.valid) {
      const datosContrasena = {
        contrasenaActual: this.passwordForm.get('currentPassword')?.value,
        contrasenaNueva: this.passwordForm.get('newPassword')?.value,
      };

      // Implementación real para cambiar contraseña
      this.usuarioService
        .actualizarMiPerfil({
          contrasena: datosContrasena.contrasenaNueva,
        })
        .subscribe({
          next: (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Contraseña actualizada correctamente',
            });
            this.passwordForm.reset();
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo actualizar la contraseña',
            });
          },
        });
    }
  }

  passwordMatchValidator(
    formGroup: FormGroup
  ): { [key: string]: boolean } | null {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }
}
