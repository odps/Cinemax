package com.cinemax.backend.services;

import com.cinemax.backend.models.Rol;
import org.springframework.http.ResponseEntity;

public interface RolService {
    ResponseEntity<?> getRoles();

    ResponseEntity<?> getRol(long id);

    ResponseEntity<?> createRol(Rol rol);

    ResponseEntity<?> updateRol(Rol rol, long id);

    ResponseEntity<?> deleteRol(long id);

    ResponseEntity<?> getRolByNombre(String nombre);

}
