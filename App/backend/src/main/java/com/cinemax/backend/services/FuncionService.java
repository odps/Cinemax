package com.cinemax.backend.services;

import com.cinemax.backend.models.Funcion;
import org.springframework.http.ResponseEntity;

public interface FuncionService {
    ResponseEntity<?> getFunciones();

    ResponseEntity<?> getFuncion(long id);

    ResponseEntity<?> createFuncion(Funcion funcion);

    ResponseEntity<?> updateFuncion(Funcion funcion, long id);

    ResponseEntity<?> deleteFuncion(long id);

    ResponseEntity<?> getFuncionesByIdPeliculaId(long idPeliculaId);

    ResponseEntity<?> getFuncionesByIdSalaId(long idSalaId);
}