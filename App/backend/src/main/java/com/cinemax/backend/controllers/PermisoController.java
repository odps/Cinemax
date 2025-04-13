package com.cinemax.backend.controllers;

import com.cinemax.backend.models.Permiso;
import com.cinemax.backend.services.implementations.PermisoServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;

@RestController
@EnableMethodSecurity
@RequestMapping("/permiso")
public class PermisoController {

    @Autowired
    private PermisoServiceImp permisoService;

    // Obtener todos los permisos
    @GetMapping("/lista")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> listaPermisos() {
        return this.permisoService.getPermisos();
    }

    // Obtener un permiso por ID
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> getPermisoById(@PathVariable long id) {
        return this.permisoService.getPermiso(id);
    }

    // Crear un permiso
    @PostMapping("/crear")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> crearPermiso(@RequestBody Permiso permiso) {
        return this.permisoService.createPermiso(permiso);
    }

    // Modificar un permiso
    @PutMapping("/editar/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> modificarPermiso(@RequestBody Permiso permiso, @PathVariable long id) {
        return this.permisoService.updatePermiso(permiso, id);
    }

    // Eliminar un permiso
    @DeleteMapping("/eliminar/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> eliminarPermiso(@PathVariable long id) {
        return this.permisoService.deletePermiso(id);
    }

    // Obtener un permiso por nombre
    @GetMapping("/nombre/{nombre}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> getPermisoByNombre(@PathVariable String nombre) {
        return this.permisoService.getPermisoByNombre(nombre);
    }
}