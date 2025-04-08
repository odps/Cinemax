package com.cinemax.backend.services;

import com.cinemax.backend.models.Rol;
import org.springframework.http.ResponseEntity;

public interface RolService {
    public ResponseEntity<?> getRoles();

    public ResponseEntity<?> getRol(long id);

    public ResponseEntity<?> createRol(Rol rol);

    public ResponseEntity<?> updateRol(Rol rol, long id);

    public ResponseEntity<?> deleteRol(long id);

    ResponseEntity<?> getRolByNombre(String nombre);

}
