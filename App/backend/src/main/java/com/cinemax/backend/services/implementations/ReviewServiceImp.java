package com.cinemax.backend.services.implementations;

import com.cinemax.backend.models.Review;
import com.cinemax.backend.repositories.ReviewRepo;
import com.cinemax.backend.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewServiceImp implements ReviewService {

    @Autowired
    ReviewRepo reviewRepo;

    @Override
    public ResponseEntity<?> getReviews() {
        List<Review> reviews = reviewRepo.findAll();
        if (reviews.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(reviews);
        }
    }

    @Override
    public ResponseEntity<?> getReview(long id) {
        Review review = reviewRepo.findById(id).orElse(null);
        if (review == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(review);
        }
    }

    @Override
    public ResponseEntity<?> createReview(Review review) {
        reviewRepo.save(review);
        return ResponseEntity.ok(review);
    }

    @Override
    public ResponseEntity<?> updateReview(Review review, long id) {
        Review reviewOld = reviewRepo.findById(id).orElse(null);
        if (reviewOld == null) {
            return ResponseEntity.badRequest().body("Review no encontrada");
        } else {
            if (review.getComentario() != null) {
                reviewOld.setComentario(review.getComentario());
            }
            if (review.getPuntuacion() != 0) {
                reviewOld.setPuntuacion(review.getPuntuacion());
            }
            reviewRepo.save(reviewOld);
            return ResponseEntity.ok(reviewOld);
        }
    }

    @Override
    public ResponseEntity<?> deleteReview(long id) {
        if (reviewRepo.existsById(id)) {
            reviewRepo.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<?> getReviewsByUsuarioId(long usuarioId) {
        List<Review> reviews = reviewRepo.findByUsuarioId(usuarioId);
        if (reviews.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(reviews);
        }
    }

    @Override
    public ResponseEntity<?> getReviewsByCineId(long cineId) {
        List<Review> reviews = reviewRepo.findByCineId(cineId);
        if (reviews.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(reviews);
        }
    }
}