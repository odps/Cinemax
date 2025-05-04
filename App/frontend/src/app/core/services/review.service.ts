import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Review } from '../interfaces/review';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = `${environment.apiUrl}/review`;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todas las reviews
   */
  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/lista`);
  }

  /**
   * Obtiene una review por su ID
   */
  getReviewById(id: number): Observable<Review> {
    return this.http.get<Review>(`${this.apiUrl}/${id}`);
  }

  /**
   * Obtiene reviews de un cine específico
   */
  getReviewsByCineId(cineId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/cine/${cineId}`);
  }

  /**
   * Obtiene reviews de un usuario específico
   */
  getReviewsByUsuarioId(usuarioId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }

  /**
   * Crea una nueva review
   */
  createReview(review: Review): Observable<Review> {
    return this.http.post<Review>(`${this.apiUrl}/crear`, review);
  }

  /**
   * Actualiza una review existente
   */
  updateReview(id: number, review: Partial<Review>): Observable<Review> {
    return this.http.put<Review>(`${this.apiUrl}/editar/${id}`, review);
  }

  /**
   * Elimina una review
   */
  deleteReview(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar/${id}`);
  }
}
