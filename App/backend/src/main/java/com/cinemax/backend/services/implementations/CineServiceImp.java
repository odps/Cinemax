package com.cinemax.backend.services.implementations;

import com.cinemax.backend.models.Cine;
import com.cinemax.backend.repositories.CineRepo;
import com.cinemax.backend.services.CineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CineServiceImp implements CineService {

    @Autowired
    private CineRepo cineRepo;

    @Override
    public ResponseEntity<?> getCines() {
        List<Cine> cines = cineRepo.findAll();
        if (cines.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(cines);
    }

    @Override
    public ResponseEntity<?> getCine(long id) {
        Cine cine = cineRepo.findById(id).orElse(null);
        if (cine == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(cine);
    }

    @Override
    public ResponseEntity<?> createCine(Cine cine) {
        if (cine.getNif() == null || cine.getNif().isEmpty() || cine.getNombre() == null || cine.getNombre().isEmpty()
                ||
                cine.getDireccion() == null || cine.getDireccion().isEmpty() || cine.getCiudad() == null
                || cine.getCiudad().isEmpty()) {
            return ResponseEntity.badRequest().body("Datos de cine inválidos");
        }

        Cine existingCine = cineRepo.findByNif(cine.getNif());
        if (existingCine != null) {
            return ResponseEntity.badRequest().body("NIF ya registrado");
        }

        if (cine.getImagenUrl() == null) {
            cine.setImagenUrl("placeholder.jpg");
        }

        cineRepo.save(cine);
        return ResponseEntity.ok(cine);
    }

    @Override
    public ResponseEntity<?> updateCine(Cine cine, long id) {
        Cine cineOld = cineRepo.findById(id).orElse(null);
        if (cineOld == null) {
            return ResponseEntity.badRequest().body("Cine no encontrado");
        }

        if (cine.getNombre() != null && !cine.getNombre().isEmpty()) {
            cineOld.setNombre(cine.getNombre());
        }
        if (cine.getDireccion() != null && !cine.getDireccion().isEmpty()) {
            cineOld.setDireccion(cine.getDireccion());
        }
        if (cine.getCiudad() != null && !cine.getCiudad().isEmpty()) {
            cineOld.setCiudad(cine.getCiudad());
        }
        if (cine.getNif() != null && !cine.getNif().isEmpty()) {
            Cine existingCine = cineRepo.findByNif(cine.getNif());
            if (existingCine != null && existingCine.getId() != id) {
                return ResponseEntity.badRequest().body("NIF ya registrado");
            }
            cineOld.setNif(cine.getNif());
        }
        if (cine.getImagenUrl() != null) {
            cineOld.setImagenUrl(cine.getImagenUrl());
        }
        if (cine.getTelefono() != null) {
            cineOld.setTelefono(cine.getTelefono());
        }

        if (cine.getDescripcion() != null) {
            cineOld.setDescripcion(cine.getDescripcion());
        }

        if (cine.getHorario() != null) {
            cineOld.setHorario(cine.getHorario());
        }

        cineRepo.save(cineOld);
        return ResponseEntity.ok(cineOld);
    }

    @Override
    public ResponseEntity<?> deleteCine(long id) {
        if (cineRepo.existsById(id)) {
            cineRepo.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @Override
    public ResponseEntity<?> getCinesByCiudad(String ciudad) {
        List<Cine> cines = cineRepo.findByCiudad(ciudad);
        if (cines.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(cines);
    }
}