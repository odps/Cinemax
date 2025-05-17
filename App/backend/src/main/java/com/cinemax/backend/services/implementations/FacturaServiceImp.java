package com.cinemax.backend.services.implementations;

import com.cinemax.backend.models.Factura;
import com.cinemax.backend.models.Usuario;
import com.cinemax.backend.repositories.FacturaRepo;
import com.cinemax.backend.repositories.UsuarioRepo;
import com.cinemax.backend.services.FacturaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacturaServiceImp implements FacturaService {

    @Autowired
    private FacturaRepo facturaRepo;

    @Autowired
    private UsuarioRepo usuarioRepo;

    @Override
    public ResponseEntity<?> getFacturas() {
        List<Factura> facturas = facturaRepo.findAll();
        if (facturas.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(facturas);
    }

    @Override
    public ResponseEntity<?> getFactura(long id) {
        Factura factura = facturaRepo.findById(id).orElse(null);
        if (factura == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(factura);
    }

    @Override
    public ResponseEntity<?> createFactura(Factura factura) {
        // Validación de datos obligatorios y existencia de usuario
        if (factura.getUsuario() == null || factura.getTicket() == null || factura.getMontoTotal() <= 0 ||
                factura.getMetodoPago() == null || factura.getMetodoPago().isEmpty() ||
                factura.getEstado() == null || factura.getEstado().isEmpty()) {
            return ResponseEntity.badRequest().body("Datos de factura inválidos");
        }
        Usuario usuario = usuarioRepo.findById(factura.getUsuario().getId()).orElse(null);
        if (usuario == null) {
            return ResponseEntity.badRequest().body("Usuario no encontrado");
        }
        factura.setUsuario(usuario);
        facturaRepo.save(factura);
        return ResponseEntity.ok(factura);
    }

    @Override
    public ResponseEntity<?> updateFactura(Factura factura, long id) {
        Factura facturaOld = facturaRepo.findById(id).orElse(null);
        if (facturaOld == null) {
            return ResponseEntity.badRequest().body("Factura no encontrada");
        }
        // Solo se actualizan los campos que vienen con datos válidos
        if (factura.getMontoTotal() > 0) {
            facturaOld.setMontoTotal(factura.getMontoTotal());
        }
        if (factura.getMetodoPago() != null && !factura.getMetodoPago().isEmpty()) {
            facturaOld.setMetodoPago(factura.getMetodoPago());
        }
        if (factura.getEstado() != null && !factura.getEstado().isEmpty()) {
            facturaOld.setEstado(factura.getEstado());
        }
        facturaRepo.save(facturaOld);
        return ResponseEntity.ok(facturaOld);
    }

    @Override
    public ResponseEntity<?> deleteFactura(long id) {
        if (facturaRepo.existsById(id)) {
            facturaRepo.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @Override
    public ResponseEntity<?> getFacturasByUsuarioId(long usuarioId) {
        // Se valida la existencia del usuario antes de buscar sus facturas
        if (!usuarioRepo.existsById(usuarioId)) {
            return ResponseEntity.badRequest().body("Usuario no encontrado");
        }
        List<Factura> facturas = facturaRepo.findByUsuarioId(usuarioId);
        if (facturas.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(facturas);
    }

    @Override
    public ResponseEntity<?> getFacturasByEstado(String estado) {
        List<Factura> facturas = facturaRepo.findByEstado(estado);
        if (facturas.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(facturas);
    }
}