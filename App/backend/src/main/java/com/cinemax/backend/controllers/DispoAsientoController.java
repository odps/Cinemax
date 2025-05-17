package com.cinemax.backend.controllers;

import com.cinemax.backend.models.DisponibilidadAsiento;
import com.cinemax.backend.services.implementations.DispoAsientoServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;

@RestController
@EnableMethodSecurity
@RequestMapping("/dispo-asiento")
// Controlador REST para la gestión de disponibilidad de asientos
public class DispoAsientoController {

    @Autowired
    private DispoAsientoServiceImp dispoAsientoService;

    // Obtener todas las disponibilidades de asientos
    @GetMapping("/lista")
    public ResponseEntity<?> listaDisponibilidadAsientos() {
        return this.dispoAsientoService.getDisponibilidadAsientos();
    }

    // Obtener una disponibilidad de asiento por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getDisponibilidadAsientoById(@PathVariable long id) {
        return this.dispoAsientoService.getDisponibilidadAsiento(id);
    }

    // Crear una disponibilidad de asiento
    @PostMapping("/crear")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> crearDisponibilidadAsiento(@RequestBody DisponibilidadAsiento disponibilidadAsiento) {
        return this.dispoAsientoService.createDisponibilidadAsiento(disponibilidadAsiento);
    }

    // Modificar una disponibilidad de asiento
    @PutMapping("/editar/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> modificarDisponibilidadAsiento(@RequestBody DisponibilidadAsiento disponibilidadAsiento,
            @PathVariable long id) {
        return this.dispoAsientoService.updateDisponibilidadAsiento(disponibilidadAsiento, id);
    }

    // Eliminar una disponibilidad de asiento
    @DeleteMapping("/eliminar/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> eliminarDisponibilidadAsiento(@PathVariable long id) {
        return this.dispoAsientoService.deleteDisponibilidadAsiento(id);
    }

    // Obtener disponibilidades de asiento por ID de asiento
    @GetMapping("/asiento/{idAsiento}")
    public ResponseEntity<?> getDisponibilidadAsientosByIdAsiento(@PathVariable long idAsiento) {
        return this.dispoAsientoService.getDisponibilidadAsientosByIdAsientoId(idAsiento);
    }

    // Obtener disponibilidades de asiento por ID de función
    @GetMapping("/funcion/{idFuncion}")
    public ResponseEntity<?> getDisponibilidadAsientosByIdFuncion(@PathVariable long idFuncion) {
        return this.dispoAsientoService.getDisponibilidadAsientosByIdFuncionId(idFuncion);
    }

    // Reservar un asiento (bloqueo temporal)
    @PostMapping("/reservar/{idDisponibilidad}")
    public ResponseEntity<?> reservarAsiento(@PathVariable long idDisponibilidad,
            @RequestParam(defaultValue = "10") int minutosBloqueo) {
        return this.dispoAsientoService.reservarAsiento(idDisponibilidad, minutosBloqueo);
    }

    // Liberar un asiento reservado
    @PostMapping("/liberar/{idDisponibilidad}")
    public ResponseEntity<?> liberarAsiento(@PathVariable long idDisponibilidad) {
        return this.dispoAsientoService.liberarAsiento(idDisponibilidad);
    }
}