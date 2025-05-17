package com.cinemax.backend.controllers;

import com.cinemax.backend.models.Log;
import com.cinemax.backend.services.implementations.LogServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;

@RestController
@EnableMethodSecurity
@RequestMapping("/log")
// Controlador REST para la gestión de logs del sistema
public class LogController {

    @Autowired
    private LogServiceImp logService;

    // Obtener todos los logs
    @GetMapping("/lista")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> listaLogs() {
        return this.logService.getLogs();
    }

    // Obtener un log por ID
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> getLogById(@PathVariable long id) {
        return this.logService.getLog(id);
    }

    // Crear un log
    @PostMapping("/crear")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> crearLog(@RequestBody Log log) {
        return this.logService.createLog(log);
    }

    // Modificar un log
    @PutMapping("/editar/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> modificarLog(@RequestBody Log log, @PathVariable long id) {
        return this.logService.updateLog(log, id);
    }

    // Eliminar un log
    @DeleteMapping("/eliminar/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> eliminarLog(@PathVariable long id) {
        return this.logService.deleteLog(id);
    }

    // Obtener logs por ID de usuario
    @GetMapping("/usuario/{usuarioId}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> getLogsByUsuarioId(@PathVariable long usuarioId) {
        return this.logService.getLogsByUsuarioId(usuarioId);
    }

    // Obtener logs por acción
    @GetMapping("/accion/{accion}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> getLogsByAccion(@PathVariable String accion) {
        return this.logService.getLogsByAccion(accion);
    }
}