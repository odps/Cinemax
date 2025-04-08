package com.cinemax.backend.services.implementations;

import com.cinemax.backend.models.Asiento;
import com.cinemax.backend.repositories.AsientoRepo;
import com.cinemax.backend.services.AsientoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AsientoServiceImp implements AsientoService {

    @Autowired
    private AsientoRepo asientoRepo;

    @Override
    public ResponseEntity<?> getAsientos() {
        List<Asiento> asientos = asientoRepo.findAll();
        if (asientos.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(asientos);
    }

    @Override
    public ResponseEntity<?> getAsiento(long id) {
        Asiento asiento = asientoRepo.findById(id).orElse(null);
        if (asiento == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(asiento);
    }

    @Override
    public ResponseEntity<?> createAsiento(Asiento asiento) {
        if (asiento.getIdSala() == null || asiento.getFila() == null || asiento.getFila().isEmpty() || asiento.getNumero() <= 0) {
            return ResponseEntity.badRequest().body("Datos de asiento inválidos");
        }
        asientoRepo.save(asiento);
        return ResponseEntity.ok(asiento);
    }

    @Override
    public ResponseEntity<?> updateAsiento(Asiento asiento, long id) {
        Asiento asientoOld = asientoRepo.findById(id).orElse(null);
        if (asientoOld == null) {
            return ResponseEntity.badRequest().body("Asiento no encontrado");
        }

        if (asiento.getIdSala() != null) {
            asientoOld.setIdSala(asiento.getIdSala());
        }
        if (asiento.getFila() != null && !asiento.getFila().isEmpty()) {
            asientoOld.setFila(asiento.getFila());
        }
        if (asiento.getNumero() > 0) {
            asientoOld.setNumero(asiento.getNumero());
        }

        asientoRepo.save(asientoOld);
        return ResponseEntity.ok(asientoOld);
    }

    @Override
    public ResponseEntity<?> deleteAsiento(long id) {
        if (asientoRepo.existsById(id)) {
            asientoRepo.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @Override
    public ResponseEntity<?> getAsientosBySalaId(long idSalaId) {
        List<Asiento> asientos = asientoRepo.findByIdSalaId(idSalaId);
        if (asientos.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(asientos);
    }
}