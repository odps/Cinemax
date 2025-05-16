package com.cinemax.backend.services;

import com.cinemax.backend.models.DisponibilidadAsiento;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface DispoAsientoService {
    ResponseEntity<?> getDisponibilidadAsientos();

    ResponseEntity<?> getDisponibilidadAsiento(long id);

    ResponseEntity<?> createDisponibilidadAsiento(DisponibilidadAsiento disponibilidadAsiento);

    ResponseEntity<?> updateDisponibilidadAsiento(DisponibilidadAsiento disponibilidadAsiento, long id);

    ResponseEntity<?> deleteDisponibilidadAsiento(long id);

    ResponseEntity<List<?>> getDisponibilidadAsientosByIdAsientoId(long idAsientoId);

    ResponseEntity<List<?>> getDisponibilidadAsientosByIdFuncionId(long idFuncionId);

    ResponseEntity<?> reservarAsiento(long idDisponibilidad, int minutosBloqueo);

    ResponseEntity<?> liberarAsiento(long idDisponibilidad);
}