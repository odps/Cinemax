package com.cinemax.backend.services;

import com.cinemax.backend.models.Pelicula;
import org.springframework.http.ResponseEntity;

public interface PeliculaService {
    ResponseEntity<?> getPeliculas();

    ResponseEntity<?> getPelicula(long id);

    ResponseEntity<?> createPelicula(Pelicula pelicula);

    ResponseEntity<?> updatePelicula(Pelicula pelicula, long id);

    ResponseEntity<?> deletePelicula(long id);

    ResponseEntity<?> getPeliculasByGenero(String genero);

    ResponseEntity<?> getPeliculasByDirector(String director);
}