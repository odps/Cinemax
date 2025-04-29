package com.cinemax.backend.services;

import com.cinemax.backend.models.Promocion;
import org.springframework.http.ResponseEntity;

public interface PromocionService {
    ResponseEntity<?> getPromociones();

    ResponseEntity<?> getPromocion(long id);

    ResponseEntity<?> createPromocion(Promocion promocion);

    ResponseEntity<?> updatePromocion(Promocion promocion, long id);

    ResponseEntity<?> deletePromocion(long id);

    ResponseEntity<?> getPromocionesByCineId(long cineId);

    ResponseEntity<?> getPromocionesActivas();

    ResponseEntity<?> getPromocionesByTipo(String tipo);

    ResponseEntity<?> asignarCineAPromocion(long promocionId, long cineId);

    ResponseEntity<?> eliminarCineDePromocion(long promocionId, long cineId);
}