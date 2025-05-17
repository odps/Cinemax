package com.cinemax.backend.controllers;

import com.cinemax.backend.models.Review;
import com.cinemax.backend.services.implementations.ReviewServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;

@RestController
@EnableMethodSecurity
@RequestMapping("/review")
// Controlador REST para la gestión de reviews de usuarios
public class ReviewController {

    @Autowired
    private ReviewServiceImp reviewService;

    // Obtener todas las reviews
    @GetMapping("/lista")
    public ResponseEntity<?> listaReviews() {
        return this.reviewService.getReviews();
    }

    // Obtener una review por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getReviewById(@PathVariable long id) {
        return this.reviewService.getReview(id);
    }

    // Crear una review
    @PostMapping("/crear")
    public ResponseEntity<?> crearReview(@RequestBody Review review) {
        return this.reviewService.createReview(review);
    }

    // Modificar una review
    @PutMapping("/editar/{id}")
    public ResponseEntity<?> modificarReview(@RequestBody Review review, @PathVariable long id) {
        return this.reviewService.updateReview(review, id);
    }

    // Eliminar una review
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarReview(@PathVariable long id) {
        return this.reviewService.deleteReview(id);
    }

    // Obtener reviews por ID de usuario
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<?> getReviewsByUsuarioId(@PathVariable long usuarioId) {
        return this.reviewService.getReviewsByUsuarioId(usuarioId);
    }

    // Obtener reviews por ID de cine
    @GetMapping("/cine/{cineId}")
    public ResponseEntity<?> getReviewsByCineId(@PathVariable long cineId) {
        return this.reviewService.getReviewsByCineId(cineId);
    }
}