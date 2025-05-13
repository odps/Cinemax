import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CineService } from '../../core/services/cine.service';
import { FuncionService } from '../../core/services/funcion.service';
import { PeliculasService } from '../../core/services/peliculas.service';
import { PromocionService } from '../../core/services/promocion.service';
import { SalaService } from '../../core/services/sala.service';
import { ImageUploadService } from '../../core/services/image-upload.service';
import { HttpClientModule } from '@angular/common/http';

// PrimeNG imports
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextarea } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { TooltipModule } from 'primeng/tooltip';
import { CardModule } from 'primeng/card';

// Interfaces
import { Cine } from '../../core/interfaces/cine';
import { Pelicula } from '../../core/interfaces/pelicula';
import { Promocion } from '../../core/interfaces/promocion';
import { Sala } from '../../core/interfaces/sala';
import { Funcion } from '../../core/interfaces/funcion';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    TabViewModule,
    ToastModule,
    ConfirmDialogModule,
    DropdownModule,
    InputTextarea,
    CalendarModule,
    FileUploadModule,
    InputNumberModule,
    MultiSelectModule,
    TooltipModule,
    CardModule,
    HttpClientModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  activeTabIndex: number = 0;

  // Arrays
  cines: Cine[] = [];
  peliculas: Pelicula[] = [];
  promociones: Promocion[] = [];
  salas: Sala[] = [];
  funciones: Funcion[] = [];

  // Selecciones
  selectedCine: Cine | null = null;
  selectedPelicula: Pelicula | null = null;
  selectedPromocion: Promocion | null = null;
  selectedSala: Sala | null = null;
  selectedFuncion: Funcion | null = null;

  // Controles de dialogo
  cineDialog: boolean = false;
  peliculaDialog: boolean = false;
  promocionDialog: boolean = false;
  salaDialog: boolean = false;
  funcionDialog: boolean = false;

  // Estados de carga
  loadingCines: boolean = false;
  loadingPeliculas: boolean = false;
  loadingPromociones: boolean = false;
  loadingSalas: boolean = false;
  loadingFunciones: boolean = false;

  // Add this property to the AdminComponent class
  tiposPromocion = [
    { label: 'Descuento', value: 'descuento' },
    { label: 'Combo', value: 'combo' },
    { label: '2x1', value: '2x1' },
    { label: 'Premium', value: 'premium' },
    { label: 'Otro', value: 'otro' },
  ];

  // Add the limitesEdadOptions array to AdminComponent to provide the dropdown options for 'Límite de edad'.
  limitesEdadOptions = [
    { label: 'PEGI 7', value: 'PEGI 7' },
    { label: 'PEGI 13', value: 'PEGI 13' },
    { label: 'PEGI 16', value: 'PEGI 16' },
    { label: 'PEGI 18', value: 'PEGI 18' },
  ];

  cineImageFile: File | null = null;
  peliculaImageFile: File | null = null;
  promocionImageFile: File | null = null;

  onCineImageSelected(event: any) {
    this.cineImageFile =
      event.target.files && event.target.files[0]
        ? event.target.files[0]
        : null;
  }
  onPeliculaImageSelected(event: any) {
    this.peliculaImageFile =
      event.target.files && event.target.files[0]
        ? event.target.files[0]
        : null;
  }
  onPromocionImageSelected(event: any) {
    this.promocionImageFile =
      event.target.files && event.target.files[0]
        ? event.target.files[0]
        : null;
  }

  uploadCineImage() {
    if (!this.cineImageFile) return;
    this.imageUploadService.uploadImage(this.cineImageFile).subscribe({
      next: (filename) => {
        this.selectedCine!.imagenUrl = filename;
        this.messageService.add({
          severity: 'success',
          summary: 'Imagen subida',
          detail: 'Imagen subida correctamente.',
        });
        this.cineImageFile = null;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo subir la imagen.',
        });
        this.cineImageFile = null;
      },
    });
  }
  uploadPeliculaImage() {
    if (!this.peliculaImageFile) return;
    this.imageUploadService.uploadImage(this.peliculaImageFile).subscribe({
      next: (filename) => {
        this.selectedPelicula!.imagenUrl = filename;
        this.messageService.add({
          severity: 'success',
          summary: 'Imagen subida',
          detail: 'Imagen subida correctamente.',
        });
        this.peliculaImageFile = null;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo subir la imagen.',
        });
        this.peliculaImageFile = null;
      },
    });
  }
  uploadPromocionImage() {
    if (!this.promocionImageFile) return;
    this.imageUploadService.uploadImage(this.promocionImageFile).subscribe({
      next: (filename) => {
        this.selectedPromocion!.imagenUrl = filename;
        this.messageService.add({
          severity: 'success',
          summary: 'Imagen subida',
          detail: 'Imagen subida correctamente.',
        });
        this.promocionImageFile = null;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo subir la imagen.',
        });
        this.promocionImageFile = null;
      },
    });
  }

  constructor(
    private cineService: CineService,
    private salaService: SalaService,
    private funcionService: FuncionService,
    private peliculaService: PeliculasService,
    private promocionesService: PromocionService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private imageUploadService: ImageUploadService
  ) {}

  ngOnInit(): void {
    this.loadCines();
    this.loadPeliculas();
    this.loadPromociones();
    this.loadSalas();
    this.loadFunciones();
  }

  // ===== CINES CRUD OPERATIONS =====
  loadCines(): void {
    this.loadingCines = true;
    console.log('Loading cines...');
    this.cineService.getListaCines().subscribe({
      next: (data: Cine[]) => {
        console.log('Cines loaded successfully:', data);
        this.cines = data;
        this.loadingCines = false;
      },
      error: (err: any) => {
        console.error('Error loading cines:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar los cines',
        });
        this.loadingCines = false;
      },
    });
  }

  openNewCine(): void {
    this.selectedCine = {} as Cine;
    this.cineDialog = true;
  }

  editCine(cine: Cine): void {
    this.selectedCine = { ...cine };
    this.cineDialog = true;
  }

  deleteCine(cine: Cine): void {
    this.confirmationService.confirm({
      message: '¿Está seguro que desea eliminar el cine ' + cine.nombre + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (cine.id) {
          this.cineService.eliminarCine(cine.id).subscribe({
            next: () => {
              this.cines = this.cines.filter((c) => c.id !== cine.id);
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Cine eliminado',
              });
            },
            error: (err: any) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al eliminar el cine',
              });
            },
          });
        }
      },
    });
  }

  saveCine(): void {
    if (this.selectedCine) {
      if (this.selectedCine.id) {
        // Update existing cine
        this.cineService
          .actualizarCine(this.selectedCine.id, this.selectedCine)
          .subscribe({
            next: (updatedCine) => {
              const index = this.cines.findIndex(
                (c) => c.id === this.selectedCine!.id
              );
              if (index !== -1) {
                this.cines[index] = updatedCine;
              }
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Cine actualizado',
              });
              this.cineDialog = false;
              this.selectedCine = null;
            },
            error: (err: any) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al actualizar el cine',
              });
            },
          });
      } else {
        // Create new cine
        this.cineService.crearCine(this.selectedCine).subscribe({
          next: (newCine) => {
            this.cines.push(newCine);
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Cine creado',
            });
            this.cineDialog = false;
            this.selectedCine = null;
          },
          error: (err: any) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error al crear el cine',
            });
          },
        });
      }
    }
  }

  // ===== PELÍCULAS CRUD OPERATIONS =====
  loadPeliculas(): void {
    this.loadingPeliculas = true;
    this.peliculaService.getListaPeliculas().subscribe({
      next: (data: Pelicula[]) => {
        this.peliculas = data;
        this.loadingPeliculas = false;
      },
      error: (err: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar las películas',
        });
        this.loadingPeliculas = false;
      },
    });
  }

  openNewPelicula(): void {
    this.selectedPelicula = {
      genero: 'Accion', // default to a valid genre
    } as Pelicula;
    this.peliculaDialog = true;
  }

  editPelicula(pelicula: Pelicula): void {
    this.selectedPelicula = { ...pelicula };
    this.peliculaDialog = true;
  }

  deletePelicula(pelicula: Pelicula): void {
    this.confirmationService.confirm({
      message:
        '¿Está seguro que desea eliminar la película ' + pelicula.titulo + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (pelicula.id) {
          this.peliculaService.eliminarPelicula(pelicula.id).subscribe({
            next: () => {
              this.peliculas = this.peliculas.filter(
                (p) => p.id !== pelicula.id
              );
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Película eliminada',
              });
            },
            error: (err: any) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al eliminar la película',
              });
            },
          });
        }
      },
    });
  }

  savePelicula(): void {
    if (this.selectedPelicula) {
      // Only allow valid genres
      const validGeneros = [
        'Accion',
        'Romance',
        'Comedia',
        'Horror',
        'Drama',
        'Ciencia Ficcion',
        'Aventura',
        'Fantasia',
      ];
      const genero = this.selectedPelicula.genero ?? '';
      if (!validGeneros.includes(genero)) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'El género debe ser uno de: ' + validGeneros.join(', '),
        });
        return;
      }
      if (this.selectedPelicula.id) {
        // Update existing pelicula
        this.peliculaService
          .actualizarPelicula(this.selectedPelicula.id, this.selectedPelicula)
          .subscribe({
            next: (updatedPelicula) => {
              const index = this.peliculas.findIndex(
                (p) => p.id === this.selectedPelicula!.id
              );
              if (index !== -1) {
                this.peliculas[index] = updatedPelicula;
              }
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Película actualizada',
              });
              this.peliculaDialog = false;
              this.selectedPelicula = null;
            },
            error: (err: any) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al actualizar la película',
              });
            },
          });
      } else {
        // Create new pelicula
        this.peliculaService.crearPelicula(this.selectedPelicula).subscribe({
          next: (newPelicula) => {
            this.peliculas.push(newPelicula);
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Película creada',
            });
            this.peliculaDialog = false;
            this.selectedPelicula = null;
          },
          error: (err: any) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error al crear la película',
            });
          },
        });
      }
    }
  }

  // ===== PROMOCIONES CRUD OPERATIONS =====
  loadPromociones(): void {
    this.loadingPromociones = true;
    this.promocionesService.getPromocionesActivas().subscribe({
      next: (data: Promocion[]) => {
        this.promociones = data;
        this.loadingPromociones = false;
      },
      error: (err: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar las promociones',
        });
        this.loadingPromociones = false;
      },
    });
  }

  openNewPromocion(): void {
    this.selectedPromocion = {} as Promocion;
    this.promocionDialog = true;
  }

  editPromocion(promocion: Promocion): void {
    this.selectedPromocion = { ...promocion };
    this.promocionDialog = true;
  }

  deletePromocion(promocion: Promocion): void {
    this.confirmationService.confirm({
      message:
        '¿Está seguro que desea eliminar la promoción ' +
        promocion.titulo +
        '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (promocion.id) {
          this.promocionesService.eliminarPromocion(promocion.id).subscribe({
            next: () => {
              this.promociones = this.promociones.filter(
                (p) => p.id !== promocion.id
              );
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Promoción eliminada',
              });
            },
            error: (err: any) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al eliminar la promoción',
              });
            },
          });
        }
      },
    });
  }

  savePromocion(): void {
    if (this.selectedPromocion) {
      if (this.selectedPromocion.id) {
        this.promocionesService
          .actualizarPromocion(
            this.selectedPromocion.id,
            this.selectedPromocion
          )
          .subscribe({
            next: (updatedPromocion) => {
              const index = this.promociones.findIndex(
                (p) => p.id === this.selectedPromocion!.id
              );
              if (index !== -1) {
                this.promociones[index] = updatedPromocion;
              }
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Promoción actualizada',
              });
              this.promocionDialog = false;
              this.selectedPromocion = null;
            },
            error: (err: any) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al actualizar la promoción',
              });
            },
          });
      } else {
        this.promocionesService
          .crearPromocion(this.selectedPromocion)
          .subscribe({
            next: (newPromocion) => {
              this.promociones.push(newPromocion);
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Promoción creada',
              });
              this.promocionDialog = false;
              this.selectedPromocion = null;
            },
            error: (err: any) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al crear la promoción',
              });
            },
          });
      }
    }
  }

  // ===== SALAS CRUD OPERATIONS =====
  loadSalas(): void {
    this.loadingSalas = true;
    this.salaService.getListaSalas().subscribe({
      next: (data: Sala[]) => {
        this.salas = data;
        this.loadingSalas = false;
      },
      error: (err: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar las salas',
        });
        this.loadingSalas = false;
      },
    });
  }

  openNewSala(): void {
    this.selectedSala = {} as Sala;
    this.salaDialog = true;
  }

  editSala(sala: Sala): void {
    this.selectedSala = { ...sala };
    this.salaDialog = true;
  }

  deleteSala(sala: Sala): void {
    this.confirmationService.confirm({
      message: '¿Está seguro que desea eliminar la sala ' + sala.nombre + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (sala.id) {
          this.salaService.eliminarSala(sala.id).subscribe({
            next: () => {
              this.salas = this.salas.filter((s) => s.id !== sala.id);
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Sala eliminada',
              });
            },
            error: (err: any) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al eliminar la sala',
              });
            },
          });
        }
      },
    });
  }

  saveSala(): void {
    if (this.selectedSala) {
      // Create a copy of the sala object that's compatible with the Sala interface
      const salaToSave: Sala = {
        ...this.selectedSala,
        cine: this.selectedSala.cine
          ? {
              id: this.selectedSala.cine.id,
              nombre: this.selectedSala.cine.nombre || '',
              direccion: this.selectedSala.cine.direccion || '',
              ciudad: this.selectedSala.cine.ciudad || '',
              nif: this.selectedSala.cine.nif || '',
            }
          : undefined,
      };

      if (this.selectedSala.id) {
        // Update existing sala
        this.salaService
          .actualizarSala(this.selectedSala.id, salaToSave)
          .subscribe({
            next: (updatedSala) => {
              const index = this.salas.findIndex(
                (s) => s.id === this.selectedSala!.id
              );
              if (index !== -1) {
                this.salas[index] = updatedSala;
              }
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Sala actualizada',
              });
              this.salaDialog = false;
              this.selectedSala = null;
            },
            error: (err: any) => {
              console.error('Error updating sala:', err);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al actualizar la sala',
              });
            },
          });
      } else {
        // Create new sala
        this.salaService.crearSala(salaToSave).subscribe({
          next: (newSala) => {
            this.salas.push(newSala);
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Sala creada',
            });
            this.salaDialog = false;
            this.selectedSala = null;
          },
          error: (err: any) => {
            console.error('Error creating sala:', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error al crear la sala',
            });
          },
        });
      }
    }
  }

  // ===== FUNCIONES CRUD OPERATIONS =====
  loadFunciones(): void {
    this.loadingFunciones = true;
    this.funcionService.getFunciones().subscribe({
      next: (data: Funcion[]) => {
        this.funciones = data;
        this.loadingFunciones = false;
      },
      error: (err: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar las funciones',
        });
        this.loadingFunciones = false;
      },
    });
  }

  openNewFuncion(): void {
    this.selectedFuncion = {} as Funcion;
    this.funcionDialog = true;
  }

  editFuncion(funcion: Funcion): void {
    this.selectedFuncion = { ...funcion };
    this.funcionDialog = true;
  }

  deleteFuncion(funcion: Funcion): void {
    this.confirmationService.confirm({
      message: '¿Está seguro que desea eliminar esta función?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (funcion.id) {
          this.funcionService.deleteFuncion(funcion.id).subscribe({
            next: () => {
              this.funciones = this.funciones.filter(
                (f) => f.id !== funcion.id
              );
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Función eliminada',
              });
            },
            error: (err: any) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al eliminar la función',
              });
            },
          });
        }
      },
    });
  }

  saveFuncion(): void {
    if (this.selectedFuncion) {
      const funcionToSave = {
        idPelicula: { id: this.selectedFuncion.idPelicula?.id },
        idSala: { id: this.selectedFuncion.idSala?.id },
        fechaHora: this.selectedFuncion.fechaHora,
        precio: this.selectedFuncion.precio,
      };

      if (this.selectedFuncion.id) {
        this.funcionService
          .updateFuncion(this.selectedFuncion.id, funcionToSave)
          .subscribe({
            next: (updatedFuncion: Funcion) => {
              const index = this.funciones.findIndex(
                (f) => f.id === this.selectedFuncion!.id
              );
              if (index !== -1) {
                this.funciones[index] = updatedFuncion;
              }
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Función actualizada',
              });
              this.funcionDialog = false;
              this.selectedFuncion = null;
            },
            error: (err: any) => {
              console.error('Error updating funcion:', err);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al actualizar la función',
              });
            },
          });
      } else {
        // Create new funcion
        this.funcionService.createFuncion(funcionToSave).subscribe({
          next: (newFuncion: Funcion) => {
            this.funciones.push(newFuncion);
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Función creada',
            });
            this.funcionDialog = false;
            this.selectedFuncion = null;
          },
          error: (err: any) => {
            console.error('Error creating funcion:', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error al crear la función',
            });
          },
        });
      }
    }
  }

  // Metodos auxiliares para ocultar los dialogs
  hideDialog(
    type: 'cine' | 'pelicula' | 'promocion' | 'sala' | 'funcion'
  ): void {
    switch (type) {
      case 'cine':
        this.cineDialog = false;
        break;
      case 'pelicula':
        this.peliculaDialog = false;
        break;
      case 'promocion':
        this.promocionDialog = false;
        break;
      case 'sala':
        this.salaDialog = false;
        break;
      case 'funcion':
        this.funcionDialog = false;
        break;
    }
  }
}
