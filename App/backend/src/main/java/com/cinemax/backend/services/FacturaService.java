package com.cinemax.backend.services;

import com.cinemax.backend.models.Factura;
import org.springframework.http.ResponseEntity;

public interface FacturaService {
    ResponseEntity<?> getFacturas();

    ResponseEntity<?> getFactura(long id);

    ResponseEntity<?> createFactura(Factura factura);

    ResponseEntity<?> updateFactura(Factura factura, long id);

    ResponseEntity<?> deleteFactura(long id);

    ResponseEntity<?> getFacturasByUsuarioId(long usuarioId);

    ResponseEntity<?> getFacturasByEstado(String estado);
}