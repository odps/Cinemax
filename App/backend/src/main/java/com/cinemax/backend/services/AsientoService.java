package com.cinemax.backend.services;

import com.cinemax.backend.models.Asiento;
import org.springframework.http.ResponseEntity;

public interface AsientoService {
    ResponseEntity<?> getAsientos();

    ResponseEntity<?> getAsiento(long id);

    ResponseEntity<?> createAsiento(Asiento asiento);

    ResponseEntity<?> updateAsiento(Asiento asiento, long id);

    ResponseEntity<?> deleteAsiento(long id);

    ResponseEntity<?> getAsientosBySalaId(long idSalaId);
}