package com.cinemax.backend.services;

import com.cinemax.backend.models.Cine;
import org.springframework.http.ResponseEntity;

public interface CineService {
    ResponseEntity<?> getCines();

    ResponseEntity<?> getCine(long id);

    ResponseEntity<?> createCine(Cine cine);

    ResponseEntity<?> updateCine(Cine cine, long id);

    ResponseEntity<?> deleteCine(long id);

    ResponseEntity<?> getCinesByCiudad(String ciudad);
}