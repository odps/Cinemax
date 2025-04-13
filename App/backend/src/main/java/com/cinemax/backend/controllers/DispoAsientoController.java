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
public class DispoAsientoController {

    @Autowired
    private DispoAsientoServiceImp dispoAsientoService;

    // Obtener todas las disponibilidades de asientos
    @GetMapping("/lista")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> listaDisponibilidadAsientos() {
        return this.dispoAsientoService.getDisponibilidadAsientos();
    }

    // Obtener una disponibilidad de asiento por ID
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
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
    public ResponseEntity<?> modificarDisponibilidadAsiento(@RequestBody DisponibilidadAsiento disponibilidadAsiento, @PathVariable long id) {
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
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> getDisponibilidadAsientosByIdAsiento(@PathVariable long idAsiento) {
        return this.dispoAsientoService.getDisponibilidadAsientosByIdAsientoId(idAsiento);
    }

    // Obtener disponibilidades de asiento por ID de función
    @GetMapping("/funcion/{idFuncion}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> getDisponibilidadAsientosByIdFuncion(@PathVariable long idFuncion) {
        return this.dispoAsientoService.getDisponibilidadAsientosByIdFuncionId(idFuncion);
    }
}