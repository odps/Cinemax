package com.cinemax.backend.services.implementations;

import com.cinemax.backend.models.DisponibilidadAsiento;
import com.cinemax.backend.repositories.DisponibilidadAsientoRepo;
import com.cinemax.backend.services.DispoAsientoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DispoAsientoServiceImp implements DispoAsientoService {

    @Autowired
    private DisponibilidadAsientoRepo disponibilidadAsientoRepo;

    @Override
    public ResponseEntity<?> getDisponibilidadAsientos() {
        List<DisponibilidadAsiento> asientos = disponibilidadAsientoRepo.findAll();
        if (asientos.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(asientos);
    }

    @Override
    public ResponseEntity<?> getDisponibilidadAsiento(long id) {
        DisponibilidadAsiento asiento = disponibilidadAsientoRepo.findById(id).orElse(null);
        if (asiento == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(asiento);
    }

    @Override
    public ResponseEntity<?> createDisponibilidadAsiento(DisponibilidadAsiento disponibilidadAsiento) {
        if (disponibilidadAsiento.getIdAsiento() == null || disponibilidadAsiento.getIdFuncion() == null ||
                disponibilidadAsiento.getEstado() == null || disponibilidadAsiento.getEstado().isEmpty()) {
            return ResponseEntity.badRequest().body("Datos de disponibilidad de asiento inválidos");
        }
        disponibilidadAsientoRepo.save(disponibilidadAsiento);
        return ResponseEntity.ok(disponibilidadAsiento);
    }

    @Override
    public ResponseEntity<?> updateDisponibilidadAsiento(DisponibilidadAsiento disponibilidadAsiento, long id) {
        DisponibilidadAsiento asientoOld = disponibilidadAsientoRepo.findById(id).orElse(null);
        if (asientoOld == null) {
            return ResponseEntity.badRequest().body("Disponibilidad de asiento no encontrada");
        }

        if (disponibilidadAsiento.getEstado() != null && !disponibilidadAsiento.getEstado().isEmpty()) {
            asientoOld.setEstado(disponibilidadAsiento.getEstado());
        }
        if (disponibilidadAsiento.getBloqueadoHasta() != null) {
            asientoOld.setBloqueadoHasta(disponibilidadAsiento.getBloqueadoHasta());
        }

        disponibilidadAsientoRepo.save(asientoOld);
        return ResponseEntity.ok(asientoOld);
    }

    @Override
    public ResponseEntity<?> deleteDisponibilidadAsiento(long id) {
        if (disponibilidadAsientoRepo.existsById(id)) {
            disponibilidadAsientoRepo.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @Override
    public ResponseEntity<List<?>> getDisponibilidadAsientosByIdAsientoId(long idAsientoId) {
        List<DisponibilidadAsiento> asientos = disponibilidadAsientoRepo.findByIdAsientoId(idAsientoId);
        if (asientos.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(asientos);
    }

    @Override
    public ResponseEntity<List<?>> getDisponibilidadAsientosByIdFuncionId(long idFuncionId) {
        List<DisponibilidadAsiento> asientos = disponibilidadAsientoRepo.findByIdFuncionId(idFuncionId);
        if (asientos.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(asientos);
    }
}