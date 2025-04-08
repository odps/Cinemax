package com.cinemax.backend.services.implementations;

import com.cinemax.backend.models.Sala;
import com.cinemax.backend.repositories.SalaRepo;
import com.cinemax.backend.services.SalaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SalaServiceImp implements SalaService {

    @Autowired
    SalaRepo salaRepo;

    @Override
    public ResponseEntity<?> getSalas() {
        List<Sala> salas = salaRepo.findAll();
        if (salas.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(salas);
        }
    }

    @Override
    public ResponseEntity<?> getSala(long id) {
        Sala sala = salaRepo.findById(id).orElse(null);
        if (sala == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(sala);
        }
    }

    @Override
    public ResponseEntity<?> createSala(Sala sala) {
        salaRepo.save(sala);
        return ResponseEntity.ok(sala);
    }

    @Override
    public ResponseEntity<?> updateSala(Sala sala, long id) {
        Sala salaOld = salaRepo.findById(id).orElse(null);
        if (salaOld == null) {
            return ResponseEntity.badRequest().body("Sala no encontrada");
        } else {
            if (sala.getNombre() != null) {
                salaOld.setNombre(sala.getNombre());
            }
            if (sala.getCapacidad() != null) {
                salaOld.setCapacidad(sala.getCapacidad());
            }
            salaRepo.save(salaOld);
            return ResponseEntity.ok(salaOld);
        }
    }

    @Override
    public ResponseEntity<?> deleteSala(long id) {
        if (salaRepo.existsById(id)) {
            salaRepo.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<?> getSalasByCineId(long cineId) {
        List<Sala> salas = salaRepo.findByCineId(cineId);
        if (salas.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(salas);
        }
    }
}