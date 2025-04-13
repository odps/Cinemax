package com.cinemax.backend.controllers;

import com.cinemax.backend.models.Asiento;
import com.cinemax.backend.services.implementations.AsientoServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;

@RestController
@EnableMethodSecurity
@RequestMapping("/asiento")
public class AsientoController {

    @Autowired
    private AsientoServiceImp asientoService;

    // Obtener todos los asientos
    @GetMapping("/lista")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> listaAsientos() {
        return this.asientoService.getAsientos();
    }

    // Obtener un asiento por ID
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> getAsientoById(@PathVariable long id) {
        return this.asientoService.getAsiento(id);
    }

    // Crear un asiento
    @PostMapping("/crear")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> crearAsiento(@RequestBody Asiento asiento) {
        return this.asientoService.createAsiento(asiento);
    }

    // Modificar un asiento
    @PutMapping("/editar/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> modificarAsiento(@RequestBody Asiento asiento, @PathVariable long id) {
        return this.asientoService.updateAsiento(asiento, id);
    }

    // Eliminar un asiento
    @DeleteMapping("/eliminar/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> eliminarAsiento(@PathVariable long id) {
        return this.asientoService.deleteAsiento(id);
    }

    // Obtener asientos por ID de sala
    @GetMapping("/sala/{idSala}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> getAsientosBySalaId(@PathVariable long idSala) {
        return this.asientoService.getAsientosBySalaId(idSala);
    }
}