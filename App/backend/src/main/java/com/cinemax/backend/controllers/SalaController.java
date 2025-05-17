package com.cinemax.backend.controllers;

import com.cinemax.backend.models.Sala;
import com.cinemax.backend.services.implementations.SalaServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;

@RestController
@EnableMethodSecurity
@RequestMapping("/sala")
// Controlador REST para la gestión de salas de cine
public class SalaController {

    @Autowired
    private SalaServiceImp salaService;

    // Obtener todas las salas
    @GetMapping("/lista")
    public ResponseEntity<?> listaSalas() {
        return this.salaService.getSalas();
    }

    // Obtener una sala por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getSalaById(@PathVariable long id) {
        return this.salaService.getSala(id);
    }

    // Crear una sala
    @PostMapping("/crear")
    public ResponseEntity<?> crearSala(@RequestBody Sala sala) {
        return this.salaService.createSala(sala);
    }

    // Modificar una sala
    @PutMapping("/editar/{id}")
    public ResponseEntity<?> modificarSala(@RequestBody Sala sala, @PathVariable long id) {
        return this.salaService.updateSala(sala, id);
    }

    // Eliminar una sala
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarSala(@PathVariable long id) {
        return this.salaService.deleteSala(id);
    }

    // Obtener salas por ID de cine
    @GetMapping("/cine/{cineId}")
    public ResponseEntity<?> getSalasByCineId(@PathVariable long cineId) {
        return this.salaService.getSalasByCineId(cineId);
    }
}