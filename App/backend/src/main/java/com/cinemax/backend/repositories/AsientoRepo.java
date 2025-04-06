package com.cinemax.backend.repositories;

import com.cinemax.backend.models.Asiento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AsientoRepo extends JpaRepository<Asiento, Long>, JpaSpecificationExecutor<Asiento> {
    List<Asiento> findByIdSalaId(long idSalaId);
}