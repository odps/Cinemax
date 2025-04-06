package com.cinemax.backend.repositories;

import com.cinemax.backend.models.Pelicula;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PeliculaRepo extends JpaRepository<Pelicula, Long>, JpaSpecificationExecutor<Pelicula> {
    List<Pelicula> findByGenero(String genero);

    List<Pelicula> findByDirector(String director);
}