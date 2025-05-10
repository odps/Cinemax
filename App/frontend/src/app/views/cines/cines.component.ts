import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { InputTextarea } from 'primeng/inputtextarea';
import { CineCardComponent } from '../../core/components/cine-card/cine-card.component';
import { CineService } from '../../core/services/cine.service';
import { ReviewService } from '../../core/services/review.service';
import { AuthService } from '../../core/services/auth.service';
import { Cine } from '../../core/interfaces/cine';
import { Review } from '../../core/interfaces/review';
import { Sala } from '../../core/interfaces/sala';
import { FuncionService } from '../../core/services/funcion.service';
import { Funcion } from '../../core/interfaces/funcion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cines',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CineCardComponent,
    DialogModule,
    TagModule,
    RatingModule,
    InputTextarea,
  ],
  templateUrl: './cines.component.html',
  styleUrl: './cines.component.css',
})
export class CinesComponent implements OnInit {
  cines: Cine[] = [];
  cineDestacado: Cine | undefined;
  cineSeleccionado: Cine | undefined;
  modalVisible: boolean = false;
  cargando: boolean = false;

  // Variables para reviews
  reviews: Review[] = [];
  isAuthenticated = false;
  currentUser: any;
  newReview: { puntuacion: number; comentario: string } = {
    puntuacion: 5,
    comentario: '',
  };
  userReview: Review | undefined;
  isEditingReview = false;
  reviewFormVisible = false;

  cartelera: { sala: Sala; funciones: any[] }[] = [];
  carteleraModalVisible: boolean = false;
  cineCarteleraSeleccionado: Cine | null = null;

  constructor(
    private cineService: CineService,
    private reviewService: ReviewService,
    private authService: AuthService,
    private funcionService: FuncionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarCines();
    this.authService.isAuthenticated$.subscribe((isAuth) => {
      this.isAuthenticated = isAuth;
    });
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });
  }

  cargarCines(): void {
    this.cargando = true;
    this.cineService.getListaCines().subscribe({
      next: (data) => {
        this.cines = data;
        // Asumimos que el primer cine es el destacado
        if (data.length > 0) {
          this.cineDestacado = data[0];
        }
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar los cines', error);
        this.cargando = false;
      },
    });
  }

  abrirModalDetalles(cine: Cine): void {
    // Si ya tenemos todos los detalles del cine, mostramos el modal directamente
    if (
      cine.descripcion !== null ||
      cine.horario !== null ||
      (cine.salas && cine.salas.length > 0)
    ) {
      this.cineSeleccionado = cine;
      this.modalVisible = true;
      this.cargarReviews(cine.id);
    } else {
      if (!cine.id) {
        console.error('Error: ID de cine no definido');
        this.cineSeleccionado = cine;
        this.modalVisible = true;
        return;
      }

      // Si no tenemos todos los detalles, hacemos otra petición para obtenerlos
      this.cargando = true;
      this.cineService.getCinePorId(cine.id).subscribe({
        next: (cineDatos) => {
          this.cineSeleccionado = cineDatos;
          this.modalVisible = true;
          this.cargando = false;
          this.cargarReviews(cine.id);
        },
        error: (error) => {
          console.error('Error al obtener detalles del cine', error);
          this.cargando = false;
          // Mostramos el modal con los datos que tenemos aunque no sean completos
          this.cineSeleccionado = cine;
          this.modalVisible = true;
          this.cargarReviews(cine.id);
        },
      });
    }
  }

  cerrarModal(): void {
    this.modalVisible = false;
    this.cineSeleccionado = undefined;
    this.reviews = [];
    this.userReview = undefined;
    this.resetReviewForm();
  }

  // Métodos para reviews
  cargarReviews(cineId: number | undefined): void {
    if (!cineId) return;

    this.reviewService.getReviewsByCineId(cineId).subscribe({
      next: (reviews) => {
        this.reviews = reviews;

        // Si el usuario está autenticado, busca su review
        if (this.isAuthenticated && this.currentUser) {
          this.userReview = reviews.find(
            (r) => r.usuario.id === this.currentUser.id
          );

          if (this.userReview) {
            // Si ya existe una review del usuario, inicializa el formulario con esos valores
            this.newReview.puntuacion = this.userReview.puntuacion;
            this.newReview.comentario = this.userReview.comentario;
          } else {
            this.resetReviewForm();
          }
        }
      },
      error: (error) => {
        console.error('Error al cargar reviews', error);
      },
    });
  }

  resetReviewForm(): void {
    this.newReview = {
      puntuacion: 5,
      comentario: '',
    };
    this.reviewFormVisible = false;
    this.isEditingReview = false;
  }

  mostrarFormularioReview(): void {
    if (this.userReview) {
      this.isEditingReview = true;
      this.newReview.puntuacion = this.userReview.puntuacion;
      this.newReview.comentario = this.userReview.comentario;
    } else {
      this.isEditingReview = false;
      this.newReview = {
        puntuacion: 5,
        comentario: '',
      };
    }
    this.reviewFormVisible = true;
  }

  cancelarReview(): void {
    this.reviewFormVisible = false;
  }

  enviarReview(): void {
    if (!this.cineSeleccionado) {
      console.error('No hay un cine seleccionado');
      return;
    }

    if (!this.isAuthenticated) {
      console.error('Usuario no autenticado');
      return;
    }

    if (!this.currentUser || !this.currentUser.id) {
      console.error('Información de usuario incompleta', this.currentUser);
      return;
    }

    if (this.isEditingReview && this.userReview) {
      // Actualizar review existente
      const reviewUpdate = {
        puntuacion: this.newReview.puntuacion,
        comentario: this.newReview.comentario,
      };

      this.reviewService
        .updateReview(this.userReview.id, reviewUpdate)
        .subscribe({
          next: (updatedReview) => {
            console.log('Review actualizada con éxito:', updatedReview);
            // Actualiza la review en la lista
            const index = this.reviews.findIndex(
              (r) => r.id === updatedReview.id
            );
            if (index !== -1) {
              this.reviews[index] = updatedReview;
            }
            this.userReview = updatedReview;

            // Forzar cierre del formulario
            this.reviewFormVisible = false;

            // Aplicar el cambio de estado de detección de Angular
            setTimeout(() => {
              this.reviewFormVisible = false;
            }, 0);
          },
          error: (error) => {
            console.error('Error al actualizar review', error);
          },
        });
    } else {
      // Crear nueva review
      const newReview = {
        usuario: { id: this.currentUser.id },
        cine: { id: this.cineSeleccionado.id },
        puntuacion: this.newReview.puntuacion,
        comentario: this.newReview.comentario,
      } as Review;

      console.log('Enviando review:', newReview);

      this.reviewService.createReview(newReview).subscribe({
        next: (createdReview) => {
          console.log('Review creada con éxito:', createdReview);
          this.reviews.push(createdReview);
          this.userReview = createdReview;

          // Forzar cierre del formulario
          this.reviewFormVisible = false;

          // Aplicar el cambio de estado de detección de Angular
          setTimeout(() => {
            this.reviewFormVisible = false;
          }, 0);
        },
        error: (error) => {
          console.error('Error al crear review', error);
        },
      });
    }
  }

  eliminarReview(): void {
    if (!this.userReview) return;

    this.reviewService.deleteReview(this.userReview.id).subscribe({
      next: () => {
        // Elimina la review de la lista
        this.reviews = this.reviews.filter((r) => r.id !== this.userReview!.id);
        this.userReview = undefined;
        this.resetReviewForm();
      },
      error: (error) => {
        console.error('Error al eliminar review', error);
      },
    });
  }

  // Método para calcular la puntuación promedio
  calcularPuntuacionPromedio(): number {
    if (!this.reviews.length) return 0;

    const total = this.reviews.reduce(
      (sum, review) => sum + review.puntuacion,
      0
    );
    return Math.round((total / this.reviews.length) * 10) / 10;
  }

  verCartelera(cine: Cine): void {
    console.log('Ver Cartelera triggered for cine:', cine);
    if (!cine.salas || cine.salas.length === 0) {
      console.error('El cine no tiene salas asociadas.');
      return;
    }

    cine.cartelera = [];
    cine.salas.forEach((sala) => {
      this.funcionService.getFuncionesBySala(sala.id!).subscribe({
        next: (funciones) => {
          cine.cartelera!.push({ sala, funciones });
        },
        error: (error) => {
          console.error(
            `Error al obtener funciones para la sala ${sala.nombre}`,
            error
          );
        },
      });
    });

    this.cineCarteleraSeleccionado = cine;
    this.carteleraModalVisible = true;
  }

  cerrarCarteleraModal(): void {
    this.carteleraModalVisible = false;
    this.cineCarteleraSeleccionado = null;
  }

  comprarTicket(funcion: Funcion): void {
    this.router.navigate(['compra']);
  }
}
