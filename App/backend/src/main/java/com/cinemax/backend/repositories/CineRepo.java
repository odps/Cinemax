package com.cinemax.backend.repositories;

import com.cinemax.backend.models.Cine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CineRepo extends JpaRepository<Cine, Long>, JpaSpecificationExecutor<Cine> {
    Cine findByNif(String nif);

    List<Cine> findByCiudad(String ciudad);
}