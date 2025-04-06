package com.cinemax.backend.repositories;

import com.cinemax.backend.models.Sala;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SalaRepo extends JpaRepository<Sala, Long>, JpaSpecificationExecutor<Sala> {
    List<Sala> findByCineId(long cineId);
}