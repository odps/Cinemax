package com.cinemax.backend.repositories;

import com.cinemax.backend.models.Permiso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface PermisoRepo extends JpaRepository<Permiso, Long>, JpaSpecificationExecutor<Permiso> {
    Permiso findByNombre(String nombre);
}