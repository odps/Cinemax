package com.cinemax.backend.services.implementations;

import com.cinemax.backend.models.Rol;
import com.cinemax.backend.repositories.RolRepo;
import com.cinemax.backend.services.RolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RolServiceImp implements RolService {

    @Autowired
    RolRepo rolRepo;

    @Override
    public ResponseEntity<?> getRoles() {
        List<Rol> roles = rolRepo.findAll();
        if (roles.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(roles);
        }
    }

    @Override
    public ResponseEntity<?> getRol(long id) {
        Rol rol = rolRepo.findById(id).orElse(null);
        if (rol == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(rol);
        }
    }

    @Override
    public ResponseEntity<?> createRol(Rol rol) {
        // Se valida que no exista un rol con el mismo nombre antes de crearlo
        Rol checkRol = rolRepo.findByNombre(rol.getNombre());
        if (checkRol != null) {
            return ResponseEntity.badRequest().body("Este rol ya existe");
        } else {
            rolRepo.save(rol);
            return ResponseEntity.ok(rol);
        }
    }

    @Override
    public ResponseEntity<?> updateRol(Rol rol, long id) {
        Rol rolOld = rolRepo.findById(id).orElse(null);
        if (rolOld == null) {
            return ResponseEntity.badRequest().body("Rol no encontrado");
        } else {
            // Solo se actualizan los campos que vienen con datos válidos
            if (rol.getNombre() != null) {
                rolOld.setNombre(rol.getNombre());
            }
            if (rol.getPermisos() != null) {
                rolOld.setPermisos(rol.getPermisos());
            }
            rolRepo.save(rolOld);
            return ResponseEntity.ok(rolOld);
        }
    }

    @Override
    public ResponseEntity<?> deleteRol(long id) {
        if (rolRepo.existsById(id)) {
            rolRepo.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<?> getRolByNombre(String nombre) {
        Rol rol = rolRepo.findByNombre(nombre);
        if (rol == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(rol);
        }
    }
}