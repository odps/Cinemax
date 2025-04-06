package com.cinemax.backend.repositories;

import com.cinemax.backend.models.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepo extends JpaRepository<Review, Long>, JpaSpecificationExecutor<Review> {
    List<Review> findByUsuarioId(long usuarioId);

    List<Review> findByCineId(long cineId);
}