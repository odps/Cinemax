package com.cinemax.backend.services;

import com.cinemax.backend.models.Sala;
import org.springframework.http.ResponseEntity;

public interface SalaService {
    ResponseEntity<?> getSalas();

    ResponseEntity<?> getSala(long id);

    ResponseEntity<?> createSala(Sala sala);

    ResponseEntity<?> updateSala(Sala sala, long id);

    ResponseEntity<?> deleteSala(long id);

    ResponseEntity<?> getSalasByCineId(long cineId);
}