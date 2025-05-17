package com.cinemax.backend.services.implementations;

import com.cinemax.backend.models.Permiso;
import com.cinemax.backend.repositories.PermisoRepo;
import com.cinemax.backend.services.PermisoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PermisoServiceImp implements PermisoService {

    @Autowired
    PermisoRepo permisoRepo;

    @Override
    public ResponseEntity<?> getPermisos() {
        List<Permiso> permisos = permisoRepo.findAll();
        if (permisos.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(permisos);
        }
    }

    @Override
    public ResponseEntity<?> getPermiso(long id) {
        Permiso permiso = permisoRepo.findById(id).orElse(null);
        if (permiso == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(permiso);
        }
    }

    @Override
    public ResponseEntity<?> createPermiso(Permiso permiso) {
        // Validación para evitar duplicados por nombre
        Permiso checkPermiso = permisoRepo.findByNombre(permiso.getNombre());
        if (checkPermiso != null) {
            return ResponseEntity.badRequest().body("Nombre de permiso existente");
        } else {
            permisoRepo.save(permiso);
            return ResponseEntity.ok(permiso);
        }
    }

    @Override
    public ResponseEntity<?> updatePermiso(Permiso permiso, long id) {
        Permiso permisoOld = permisoRepo.findById(id).orElse(null);
        if (permisoOld == null) {
            return ResponseEntity.badRequest().body("Permiso no encontrado");
        } else {
            // Solo se actualiza el nombre si es válido
            if (permiso.getNombre() != null) {
                permisoOld.setNombre(permiso.getNombre());
            }
            permisoRepo.save(permisoOld);
            return ResponseEntity.ok(permisoOld);
        }
    }

    @Override
    public ResponseEntity<?> deletePermiso(long id) {
        if (permisoRepo.existsById(id)) {
            permisoRepo.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<?> getPermisoByNombre(String nombre) {
        Permiso permiso = permisoRepo.findByNombre(nombre);
        if (permiso == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(permiso);
        }
    }
}