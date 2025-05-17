package com.cinemax.backend.controllers;

import com.cinemax.backend.models.Cine;
import com.cinemax.backend.services.implementations.CineServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;

@RestController
@EnableMethodSecurity
@RequestMapping("/cine")
// Controlador REST para la gestión de cines
public class CineController {

    @Autowired
    private CineServiceImp cineService;

    // Obtener todos los cines
    @GetMapping("/lista")
    public ResponseEntity<?> listaCines() {
        return this.cineService.getCines();
    }

    // Obtener un cine por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getCineById(@PathVariable long id) {
        return this.cineService.getCine(id);
    }

    // Crear un cine
    @PostMapping("/crear")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> crearCine(@RequestBody Cine cine) {
        return this.cineService.createCine(cine);
    }

    // Modificar un cine
    @PutMapping("/editar/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> modificarCine(@RequestBody Cine cine, @PathVariable long id) {
        return this.cineService.updateCine(cine, id);
    }

    // Eliminar un cine
    @DeleteMapping("/eliminar/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> eliminarCine(@PathVariable long id) {
        return this.cineService.deleteCine(id);
    }

    // Obtener cines por ciudad
    @GetMapping("/ciudad/{ciudad}")
    public ResponseEntity<?> getCinesByCiudad(@PathVariable String ciudad) {
        return this.cineService.getCinesByCiudad(ciudad);
    }
}