package com.cinemax.backend.controllers;

import com.cinemax.backend.models.Factura;
import com.cinemax.backend.services.implementations.FacturaServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;

@RestController
@EnableMethodSecurity
@RequestMapping("/factura")
public class FacturaController {

    @Autowired
    private FacturaServiceImp facturaService;

    // Obtener todas las facturas
    @GetMapping("/lista")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> listaFacturas() {
        return this.facturaService.getFacturas();
    }

    // Obtener una factura por ID
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> getFacturaById(@PathVariable long id) {
        return this.facturaService.getFactura(id);
    }

    // Crear una factura
    @PostMapping("/crear")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> crearFactura(@RequestBody Factura factura) {
        return this.facturaService.createFactura(factura);
    }

    // Modificar una factura
    @PutMapping("/editar/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> modificarFactura(@RequestBody Factura factura, @PathVariable long id) {
        return this.facturaService.updateFactura(factura, id);
    }

    // Eliminar una factura
    @DeleteMapping("/eliminar/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> eliminarFactura(@PathVariable long id) {
        return this.facturaService.deleteFactura(id);
    }

    // Obtener facturas por ID de usuario
    @GetMapping("/usuario/{usuarioId}")
    //@PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> getFacturasByUsuarioId(@PathVariable long usuarioId) {
        return this.facturaService.getFacturasByUsuarioId(usuarioId);
    }

    // Obtener facturas por estado
    @GetMapping("/estado/{estado}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> getFacturasByEstado(@PathVariable String estado) {
        return this.facturaService.getFacturasByEstado(estado);
    }
}