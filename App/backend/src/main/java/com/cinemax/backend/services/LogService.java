package com.cinemax.backend.services;

import com.cinemax.backend.models.Log;
import org.springframework.http.ResponseEntity;

public interface LogService {
    ResponseEntity<?> getLogs();

    ResponseEntity<?> getLog(long id);

    ResponseEntity<?> createLog(Log log);

    ResponseEntity<?> updateLog(Log log, long id);

    ResponseEntity<?> deleteLog(long id);

    ResponseEntity<?> getLogsByUsuarioId(long usuarioId);

    ResponseEntity<?> getLogsByAccion(String accion);
}