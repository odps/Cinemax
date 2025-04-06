package com.cinemax.backend.repositories;

import com.cinemax.backend.models.DisponibilidadAsiento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DisponibilidadAsientoRepo extends JpaRepository<DisponibilidadAsiento, Long>, JpaSpecificationExecutor<DisponibilidadAsiento> {
    List<DisponibilidadAsiento> findByIdAsientoId(long idAsientoId);

    List<DisponibilidadAsiento> findByIdFuncionId(long idFuncionId);
}