package com.cinemax.backend.controllers;

import com.cinemax.backend.models.Promocion;
import com.cinemax.backend.services.implementations.PromocionServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;

@RestController
@EnableMethodSecurity
@RequestMapping("/promocion")
// Controlador REST para la gestión de promociones
public class PromocionController {

    @Autowired
    private PromocionServiceImp promocionService;

    // Obtener todas las promociones
    @GetMapping("/lista")
    public ResponseEntity<?> listaPromociones() {
        return this.promocionService.getPromociones();
    }

    // Obtener una promoción por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getPromocionById(@PathVariable long id) {
        return this.promocionService.getPromocion(id);
    }

    // Crear una promoción
    @PostMapping("/crear")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> crearPromocion(@RequestBody Promocion promocion) {
        return this.promocionService.createPromocion(promocion);
    }

    // Modificar una promoción
    @PutMapping("/editar/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> modificarPromocion(@RequestBody Promocion promocion, @PathVariable long id) {
        return this.promocionService.updatePromocion(promocion, id);
    }

    // Eliminar una promoción
    @DeleteMapping("/eliminar/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> eliminarPromocion(@PathVariable long id) {
        return this.promocionService.deletePromocion(id);
    }

    // Obtener promociones activas
    @GetMapping("/activas")
    public ResponseEntity<?> getPromocionesActivas() {
        return this.promocionService.getPromocionesActivas();
    }

    // Obtener promociones por tipo
    @GetMapping("/tipo/{tipo}")
    public ResponseEntity<?> getPromocionesByTipo(@PathVariable String tipo) {
        return this.promocionService.getPromocionesByTipo(tipo);
    }

    // Obtener promociones por cine
    @GetMapping("/cine/{idCine}")
    public ResponseEntity<?> getPromocionesByCine(@PathVariable long idCine) {
        return this.promocionService.getPromocionesByCineId(idCine);
    }

    // Asignar un cine a una promoción
    @PostMapping("/{idPromocion}/cine/{idCine}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> asignarCineAPromocion(@PathVariable long idPromocion, @PathVariable long idCine) {
        return this.promocionService.asignarCineAPromocion(idPromocion, idCine);
    }

    // Eliminar un cine de una promoción
    @DeleteMapping("/{idPromocion}/cine/{idCine}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> eliminarCineDePromocion(@PathVariable long idPromocion, @PathVariable long idCine) {
        return this.promocionService.eliminarCineDePromocion(idPromocion, idCine);
    }
}