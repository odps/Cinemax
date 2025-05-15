package com.cinemax.backend.services.implementations;

import com.cinemax.backend.models.Cine;
import com.cinemax.backend.models.Promocion;
import com.cinemax.backend.repositories.CineRepo;
import com.cinemax.backend.repositories.PromocionRepo;
import com.cinemax.backend.services.PromocionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PromocionServiceImp implements PromocionService {

    @Autowired
    private PromocionRepo promocionRepo;

    @Autowired
    private CineRepo cineRepo;

    @Override
    public ResponseEntity<?> getPromociones() {
        List<Promocion> promociones = promocionRepo.findAll();
        return ResponseEntity.ok(promociones);
    }

    @Override
    public ResponseEntity<?> getPromocion(long id) {
        Promocion promocion = promocionRepo.findById(id).orElse(null);
        if (promocion == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(promocion);
    }

    @Override
    public ResponseEntity<?> createPromocion(Promocion promocion) {
        if (promocion.getTitulo() == null || promocion.getTitulo().isEmpty() ||
                promocion.getDescripcion() == null || promocion.getDescripcion().isEmpty() ||
                promocion.getTipo() == null || promocion.getTipo().isEmpty() ||
                promocion.getFechaInicio() == null || promocion.getFechaFin() == null) {
            return ResponseEntity.badRequest().body("Datos de promoción inválidos");
        }

        if (promocion.getFechaFin().isBefore(promocion.getFechaInicio())) {
            return ResponseEntity.badRequest().body("La fecha de fin debe ser posterior a la fecha de inicio");
        }

        promocionRepo.save(promocion);
        return ResponseEntity.ok(promocion);
    }

    @Override
    public ResponseEntity<?> updatePromocion(Promocion promocion, long id) {
        Promocion promocionOld = promocionRepo.findById(id).orElse(null);
        if (promocionOld == null) {
            return ResponseEntity.badRequest().body("Promoción no encontrada");
        }

        if (promocion.getTitulo() != null && !promocion.getTitulo().isEmpty()) {
            promocionOld.setTitulo(promocion.getTitulo());
        }
        if (promocion.getDescripcion() != null && !promocion.getDescripcion().isEmpty()) {
            promocionOld.setDescripcion(promocion.getDescripcion());
        }
        if (promocion.getTipo() != null && !promocion.getTipo().isEmpty()) {
            promocionOld.setTipo(promocion.getTipo());
        }
        if (promocion.getFechaInicio() != null) {
            promocionOld.setFechaInicio(promocion.getFechaInicio());
        }
        if (promocion.getFechaFin() != null) {
            promocionOld.setFechaFin(promocion.getFechaFin());
        }
        if (promocion.getImagenUrl() != null) {
            promocionOld.setImagenUrl(promocion.getImagenUrl());
        }

        // Validar que la fecha fin sea posterior a la fecha inicio
        if (promocionOld.getFechaFin().isBefore(promocionOld.getFechaInicio())) {
            return ResponseEntity.badRequest().body("La fecha de fin debe ser posterior a la fecha de inicio");
        }

        promocionRepo.save(promocionOld);
        return ResponseEntity.ok(promocionOld);
    }

    @Override
    public ResponseEntity<?> deletePromocion(long id) {
        if (promocionRepo.existsById(id)) {
            promocionRepo.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @Override
    public ResponseEntity<?> getPromocionesByCineId(long cineId) {
        List<Promocion> promociones = promocionRepo.findByCinesId(cineId);
        return ResponseEntity.ok(promociones);
    }

    @Override
    public ResponseEntity<?> getPromocionesActivas() {
        LocalDate hoy = LocalDate.now();
        List<Promocion> promociones = promocionRepo.findByFechaFinGreaterThanEqual(hoy);
        return ResponseEntity.ok(promociones);
    }

    @Override
    public ResponseEntity<?> getPromocionesByTipo(String tipo) {
        List<Promocion> promociones = promocionRepo.findByTipoIgnoreCase(tipo);
        return ResponseEntity.ok(promociones);
    }

    @Override
    public ResponseEntity<?> asignarCineAPromocion(long promocionId, long cineId) {
        Promocion promocion = promocionRepo.findById(promocionId).orElse(null);
        Cine cine = cineRepo.findById(cineId).orElse(null);

        if (promocion == null) {
            return ResponseEntity.badRequest().body("Promoción no encontrada");
        }
        if (cine == null) {
            return ResponseEntity.badRequest().body("Cine no encontrado");
        }

        // Verificar si ya existe la relación
        if (promocion.getCines().contains(cine)) {
            return ResponseEntity.badRequest().body("El cine ya está asignado a esta promoción");
        }

        promocion.getCines().add(cine);
        promocionRepo.save(promocion);

        return ResponseEntity.ok("Cine asignado correctamente a la promoción");
    }

    @Override
    public ResponseEntity<?> eliminarCineDePromocion(long promocionId, long cineId) {
        Promocion promocion = promocionRepo.findById(promocionId).orElse(null);
        Cine cine = cineRepo.findById(cineId).orElse(null);

        if (promocion == null) {
            return ResponseEntity.badRequest().body("Promoción no encontrada");
        }
        if (cine == null) {
            return ResponseEntity.badRequest().body("Cine no encontrado");
        }

        // Verificar si existe la relación
        if (!promocion.getCines().contains(cine)) {
            return ResponseEntity.badRequest().body("El cine no está asignado a esta promoción");
        }

        promocion.getCines().remove(cine);
        promocionRepo.save(promocion);

        return ResponseEntity.ok("Cine eliminado correctamente de la promoción");
    }
}