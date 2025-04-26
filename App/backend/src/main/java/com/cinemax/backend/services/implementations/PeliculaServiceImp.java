package com.cinemax.backend.services.implementations;

import com.cinemax.backend.models.Pelicula;
import com.cinemax.backend.repositories.PeliculaRepo;
import com.cinemax.backend.services.PeliculaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PeliculaServiceImp implements PeliculaService {

    @Autowired
    PeliculaRepo peliculaRepo;

    @Override
    public ResponseEntity<?> getPeliculas() {
        List<Pelicula> peliculas = peliculaRepo.findAll();
        if (peliculas.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(peliculas);
        }
    }

    @Override
    public ResponseEntity<?> getPelicula(long id) {
        Pelicula pelicula = peliculaRepo.findById(id).orElse(null);
        if (pelicula == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(pelicula);
        }
    }

    @Override
    public ResponseEntity<?> createPelicula(Pelicula pelicula) {
        if (pelicula.getTitulo() == null || pelicula.getGenero() == null || pelicula.getDuracion() <= 0) {
            return ResponseEntity.badRequest().body("Datos de película inválidos");
        }
        if (pelicula.getImagenUrl() == null) {
            pelicula.setImagenUrl("placeholder.jpg");
        }
        peliculaRepo.save(pelicula);
        return ResponseEntity.ok(pelicula);
    }

    @Override
    public ResponseEntity<?> updatePelicula(Pelicula pelicula, long id) {
        Pelicula peliculaOld = peliculaRepo.findById(id).orElse(null);
        if (peliculaOld == null) {
            return ResponseEntity.badRequest().body("Película no encontrada");
        } else {
            if (pelicula.getTitulo() != null) {
                peliculaOld.setTitulo(pelicula.getTitulo());
            }
            if (pelicula.getGenero() != null) {
                peliculaOld.setGenero(pelicula.getGenero());
            }
            if (pelicula.getDuracion() > 0) {
                peliculaOld.setDuracion(pelicula.getDuracion());
            }
            if (pelicula.getLimiteEdad() != null) {
                peliculaOld.setLimiteEdad(pelicula.getLimiteEdad());
            }
            if (pelicula.getDirector() != null) {
                peliculaOld.setDirector(pelicula.getDirector());
            }
            if (pelicula.getDescripcion() != null) {
                peliculaOld.setDescripcion(pelicula.getDescripcion());
            }
            if (pelicula.getImagenUrl() != null) {
                peliculaOld.setImagenUrl(pelicula.getImagenUrl());
            }
            peliculaRepo.save(peliculaOld);
            return ResponseEntity.ok(peliculaOld);
        }
    }

    @Override
    public ResponseEntity<?> deletePelicula(long id) {
        if (peliculaRepo.existsById(id)) {
            peliculaRepo.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<?> getPeliculasByGenero(String genero) {
        List<Pelicula> peliculas = peliculaRepo.findByGenero(genero);
        if (peliculas.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(peliculas);
        }
    }

    @Override
    public ResponseEntity<?> getPeliculasByDirector(String director) {
        List<Pelicula> peliculas = peliculaRepo.findByDirector(director);
        if (peliculas.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(peliculas);
        }
    }
}