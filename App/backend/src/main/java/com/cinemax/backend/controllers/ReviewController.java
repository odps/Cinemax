package com.cinemax.backend.controllers;

import com.cinemax.backend.models.Review;
import com.cinemax.backend.services.implementations.ReviewServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;

@RestController
@EnableMethodSecurity
@RequestMapping("/review")
public class ReviewController {

    @Autowired
    private ReviewServiceImp reviewService;

    // Obtener todas las reviews
    @GetMapping("/lista")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> listaReviews() {
        return this.reviewService.getReviews();
    }

    // Obtener una review por ID
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> getReviewById(@PathVariable long id) {
        return this.reviewService.getReview(id);
    }

    // Crear una review
    @PostMapping("/crear")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> crearReview(@RequestBody Review review) {
        return this.reviewService.createReview(review);
    }

    // Modificar una review
    @PutMapping("/editar/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> modificarReview(@RequestBody Review review, @PathVariable long id) {
        return this.reviewService.updateReview(review, id);
    }

    // Eliminar una review
    @DeleteMapping("/eliminar/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> eliminarReview(@PathVariable long id) {
        return this.reviewService.deleteReview(id);
    }

    // Obtener reviews por ID de usuario
    @GetMapping("/usuario/{usuarioId}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> getReviewsByUsuarioId(@PathVariable long usuarioId) {
        return this.reviewService.getReviewsByUsuarioId(usuarioId);
    }

    // Obtener reviews por ID de cine
    @GetMapping("/cine/{cineId}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> getReviewsByCineId(@PathVariable long cineId) {
        return this.reviewService.getReviewsByCineId(cineId);
    }
}