import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
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
import { DialogModule } from 'primeng/dialog';

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
    DialogModule,
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
  showPrintDialog: boolean = false;
  facturaToPrint: Factura | null = null;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private facturaService: FacturaService
  ) {
    // Inicializa el formulario de perfil del usuario
    this.userForm = this.fb.group({
      nombre: [{ value: '', disabled: false }, [Validators.required]],
      correo: [
        { value: '', disabled: false },
        [Validators.required, Validators.email],
      ],
      fechaRegistro: [{ value: '', disabled: true }],
      rol: [{ value: '', disabled: true }],
    });

    // Inicializa el formulario para cambio de contraseña con validador personalizado
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

    // Configuración de las secciones del menú de perfil
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

  // Carga los datos del usuario desde el backend y los asigna al formulario
  cargarDatosUsuario(): void {
    this.loading = true;
    const userIdStr = localStorage.getItem('userId');
    if (userIdStr) {
      this.userId = parseInt(userIdStr, 10);
      this.usuarioService.getMiPerfil().subscribe({
        next: (usuario) => {
          this.userData = usuario;
          this.userForm.patchValue({
            nombre: usuario.nombre,
            correo: usuario.correo,
            fechaRegistro: usuario.fechaRegistro,
            rol: usuario.rol?.nombre || 'Cliente',
          });
          this.loading = false;
        },
        error: () => {
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

  // Cambia la sección visible en el perfil y carga facturas si corresponde
  cambiarSeccion(seccion: string): void {
    this.currentSection = seccion;
    if (seccion === 'compras') {
      this.cargarFacturasUsuario();
    }
  }

  // Carga las facturas del usuario desde el backend
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
        error: () => {
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

  // Guarda los cambios realizados en el formulario de perfil
  guardarCambios(): void {
    if (this.userForm.valid) {
      const datosActualizados = {
        nombre: this.userForm.get('nombre')?.value,
        correo: this.userForm.get('correo')?.value,
      };
      this.usuarioService.actualizarMiPerfil(datosActualizados).subscribe({
        next: () => {
          // Actualiza los datos en localStorage para mantener consistencia
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
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo actualizar el perfil',
          });
        },
      });
    }
  }

  // Cambia la contraseña del usuario si el formulario es válido
  cambiarContrasena(): void {
    if (this.passwordForm.valid) {
      const datosContrasena = {
        contrasenaActual: this.passwordForm.get('currentPassword')?.value,
        contrasenaNueva: this.passwordForm.get('newPassword')?.value,
      };
      this.usuarioService
        .actualizarMiPerfil({
          contrasena: datosContrasena.contrasenaNueva,
        })
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Contraseña actualizada correctamente',
            });
            this.passwordForm.reset();
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo actualizar la contraseña',
            });
          },
        });
    }
  }

  // Abre el diálogo para imprimir la factura seleccionada
  openPrintDialog(factura: Factura): void {
    this.facturaToPrint = factura;
    this.showPrintDialog = true;
  }

  // Llama a la función de impresión del navegador
  printFactura(): void {
    window.print();
  }

  // Cierra el diálogo de impresión y limpia la factura seleccionada
  closePrintDialog(): void {
    this.showPrintDialog = false;
    this.facturaToPrint = null;
  }

  // Validador personalizado para verificar que las contraseñas coincidan
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
