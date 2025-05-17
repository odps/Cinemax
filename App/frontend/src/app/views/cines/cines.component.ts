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
        if (data.length > 0) {
          // Selecciona un cine aleatorio para destacar
          const randomIndex = Math.floor(Math.random() * data.length);
          this.cineDestacado = data[randomIndex];
        }
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      },
    });
  }

  abrirModalDetalles(cine: Cine): void {
    // Si ya tenemos detalles suficientes del cine, mostramos el modal directamente
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
        this.cineSeleccionado = cine;
        this.modalVisible = true;
        return;
      }
      // Si faltan detalles, se realiza una petición adicional
      this.cargando = true;
      this.cineService.getCinePorId(cine.id).subscribe({
        next: (cineDatos) => {
          this.cineSeleccionado = cineDatos;
          this.modalVisible = true;
          this.cargando = false;
          this.cargarReviews(cine.id);
        },
        error: () => {
          this.cargando = false;
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

  // Carga las reviews del cine y determina si el usuario actual ya dejó una opinión
  cargarReviews(cineId: number | undefined): void {
    if (!cineId) return;

    this.reviewService.getReviewsByCineId(cineId).subscribe({
      next: (reviews) => {
        this.reviews = reviews;
        if (this.isAuthenticated && this.currentUser) {
          this.userReview = reviews.find(
            (r) => r.usuario.id === this.currentUser.id
          );
          if (this.userReview) {
            this.newReview.puntuacion = this.userReview.puntuacion;
            this.newReview.comentario = this.userReview.comentario;
          } else {
            this.resetReviewForm();
          }
        }
      },
      error: () => {},
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
    if (!this.cineSeleccionado) return;
    if (!this.isAuthenticated) return;
    if (!this.currentUser || !this.currentUser.id) return;

    if (this.isEditingReview && this.userReview) {
      // Actualiza una review existente
      const reviewUpdate = {
        puntuacion: this.newReview.puntuacion,
        comentario: this.newReview.comentario,
      };

      this.reviewService
        .updateReview(this.userReview.id, reviewUpdate)
        .subscribe({
          next: (updatedReview) => {
            // Actualiza la review en la lista local
            const index = this.reviews.findIndex(
              (r) => r.id === updatedReview.id
            );
            if (index !== -1) {
              this.reviews[index] = updatedReview;
            }
            this.userReview = updatedReview;
            this.reviewFormVisible = false;
            setTimeout(() => {
              this.reviewFormVisible = false;
            }, 0);
          },
          error: () => {},
        });
    } else {
      // Crea una nueva review
      const newReview = {
        usuario: { id: this.currentUser.id },
        cine: { id: this.cineSeleccionado.id },
        puntuacion: this.newReview.puntuacion,
        comentario: this.newReview.comentario,
      } as Review;

      this.reviewService.createReview(newReview).subscribe({
        next: (createdReview) => {
          this.reviews = [...this.reviews, createdReview];
          this.userReview = createdReview;
          this.reviewFormVisible = false;
          setTimeout(() => {
            this.reviewFormVisible = false;
          }, 0);
        },
        error: () => {},
      });
    }
  }

  eliminarReview(): void {
    if (!this.userReview) return;

    this.reviewService.deleteReview(this.userReview.id).subscribe({
      next: () => {
        // Elimina la review de la lista local y resetea el formulario
        this.reviews = this.reviews.filter((r) => r.id !== this.userReview!.id);
        this.userReview = undefined;
        this.resetReviewForm();
      },
      error: () => {},
    });
  }

  // Calcula la puntuación promedio de las reviews del cine
  calcularPuntuacionPromedio(): number {
    if (!this.reviews.length) return 0;
    const total = this.reviews.reduce(
      (sum, review) => sum + review.puntuacion,
      0
    );
    return Math.round((total / this.reviews.length) * 10) / 10;
  }

  // Obtiene la cartelera de funciones para cada sala del cine seleccionado
  verCartelera(cine: Cine): void {
    if (!cine.salas || cine.salas.length === 0) return;

    cine.cartelera = [];
    cine.salas.forEach((sala) => {
      this.funcionService.getFuncionesBySala(sala.id!).subscribe({
        next: (funciones) => {
          cine.cartelera!.push({ sala, funciones });
        },
        error: () => {},
      });
    });

    this.cineCarteleraSeleccionado = cine;
    this.carteleraModalVisible = true;
  }

  cerrarCarteleraModal(): void {
    this.carteleraModalVisible = false;
    this.cineCarteleraSeleccionado = null;
  }

  // Redirige a la página de compra de tickets con los parámetros necesarios
  comprarTicket(funcion: Funcion): void {
    this.router.navigate(['compra'], {
      queryParams: {
        funcionId: funcion.id,
        peliculaId: funcion.idPelicula?.id,
        salaId: funcion.idSala?.id,
      },
    });
  }
}
