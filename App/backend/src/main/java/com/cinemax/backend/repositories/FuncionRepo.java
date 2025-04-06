package com.cinemax.backend.repositories;

import com.cinemax.backend.models.Funcion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FuncionRepo extends JpaRepository<Funcion, Long>, JpaSpecificationExecutor<Funcion> {
    List<Funcion> findByIdPeliculaId(long idPeliculaId);

    List<Funcion> findByIdSalaId(long idSalaId);
}