package com.cinemax.backend.repositories;

import com.cinemax.backend.models.Promocion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PromocionRepo extends JpaRepository<Promocion, Long> {
    List<Promocion> findByTipoIgnoreCase(String tipo);

    List<Promocion> findByFechaFinGreaterThanEqual(LocalDate fecha);

    List<Promocion> findByFechaInicioBetween(LocalDate fechaInicio, LocalDate fechaFin);

    List<Promocion> findByCinesId(long cineId);
}