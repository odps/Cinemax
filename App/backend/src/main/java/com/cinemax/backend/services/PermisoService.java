package com.cinemax.backend.services;

import com.cinemax.backend.models.Permiso;
import org.springframework.http.ResponseEntity;

public interface PermisoService {
    ResponseEntity<?> getPermisos();

    ResponseEntity<?> getPermiso(long id);

    ResponseEntity<?> createPermiso(Permiso permiso);

    ResponseEntity<?> updatePermiso(Permiso permiso, long id);

    ResponseEntity<?> deletePermiso(long id);

    ResponseEntity<?> getPermisoByNombre(String nombre);
}