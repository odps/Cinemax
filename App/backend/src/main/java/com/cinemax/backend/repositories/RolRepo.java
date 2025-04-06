package com.cinemax.backend.repositories;

import com.cinemax.backend.models.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface RolRepo extends JpaRepository<Rol, Long>, JpaSpecificationExecutor<Rol> {
    Rol findByNombre(String nombre);
}