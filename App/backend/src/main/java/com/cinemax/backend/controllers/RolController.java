package com.cinemax.backend.controllers;

import com.cinemax.backend.models.Rol;
import com.cinemax.backend.services.implementations.RolServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;

@RestController
@EnableMethodSecurity
@RequestMapping("/rol")
public class RolController {

    @Autowired
    private RolServiceImp rolService;

    // Obtener todos los roles
    @GetMapping("/lista")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> listaRoles() {
        return this.rolService.getRoles();
    }

    // Obtener un rol por ID
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> getRolById(@PathVariable long id) {
        return this.rolService.getRol(id);
    }

    // Crear un rol
    @PostMapping("/crear")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> crearRol(@RequestBody Rol rol) {
        return this.rolService.createRol(rol);
    }

    // Modificar un rol
    @PutMapping("/editar/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> modificarRol(@RequestBody Rol rol, @PathVariable long id) {
        return this.rolService.updateRol(rol, id);
    }

    // Eliminar un rol
    @DeleteMapping("/eliminar/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> eliminarRol(@PathVariable long id) {
        return this.rolService.deleteRol(id);
    }

    // Obtener un rol por nombre
    @GetMapping("/nombre/{nombre}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> getRolByNombre(@PathVariable String nombre) {
        return this.rolService.getRolByNombre(nombre);
    }
}