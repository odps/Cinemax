package com.cinemax.backend.controllers;

import com.cinemax.backend.models.Funcion;
import com.cinemax.backend.services.implementations.FuncionServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;

/**
 * Controlador REST para la gestión de funciones de cine
 */
@RestController
@EnableMethodSecurity
@RequestMapping("/funcion")
public class FuncionController {

    @Autowired
    private FuncionServiceImp funcionService;

    // Obtener todas las funciones
    @GetMapping("/lista")
    public ResponseEntity<?> listaFunciones() {
        return this.funcionService.getFunciones();
    }

    // Obtener una función por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getFuncionById(@PathVariable long id) {
        return this.funcionService.getFuncion(id);
    }

    // Crear una función
    @PostMapping("/crear")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> crearFuncion(@RequestBody Funcion funcion) {
        return this.funcionService.createFuncion(funcion);
    }

    // Modificar una función
    @PutMapping("/editar/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> modificarFuncion(@RequestBody Funcion funcion, @PathVariable long id) {
        return this.funcionService.updateFuncion(funcion, id);
    }

    // Eliminar una función
    @DeleteMapping("/eliminar/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> eliminarFuncion(@PathVariable long id) {
        return this.funcionService.deleteFuncion(id);
    }

    // Obtener funciones por ID de película
    @GetMapping("/pelicula/{idPelicula}")
    public ResponseEntity<?> getFuncionesByIdPelicula(@PathVariable long idPelicula) {
        return this.funcionService.getFuncionesByIdPeliculaId(idPelicula);
    }

    // Obtener funciones por ID de sala
    @GetMapping("/sala/{idSala}")
    public ResponseEntity<?> getFuncionesByIdSala(@PathVariable long idSala) {
        return this.funcionService.getFuncionesByIdSalaId(idSala);
    }
}