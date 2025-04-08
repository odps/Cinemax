package com.cinemax.backend.services;

import com.cinemax.backend.models.Review;
import org.springframework.http.ResponseEntity;

public interface ReviewService {
    ResponseEntity<?> getReviews();

    ResponseEntity<?> getReview(long id);

    ResponseEntity<?> createReview(Review review);

    ResponseEntity<?> updateReview(Review review, long id);

    ResponseEntity<?> deleteReview(long id);

    ResponseEntity<?> getReviewsByUsuarioId(long usuarioId);

    ResponseEntity<?> getReviewsByCineId(long cineId);
}