package com.cinemax.backend.controllers;

import com.cinemax.backend.models.Pelicula;
import com.cinemax.backend.services.implementations.PeliculaServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;

@RestController
@EnableMethodSecurity
@RequestMapping("/pelicula")
public class PeliculaController {

    @Autowired
    private PeliculaServiceImp peliculaService;

    // Obtener todas las películas
    @GetMapping("/lista")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> listaPeliculas() {
        return this.peliculaService.getPeliculas();
    }

    // Obtener una película por ID
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> getPeliculaById(@PathVariable long id) {
        return this.peliculaService.getPelicula(id);
    }

    // Crear una película
    @PostMapping("/crear")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> crearPelicula(@RequestBody Pelicula pelicula) {
        return this.peliculaService.createPelicula(pelicula);
    }

    // Modificar una película
    @PutMapping("/editar/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> modificarPelicula(@RequestBody Pelicula pelicula, @PathVariable long id) {
        return this.peliculaService.updatePelicula(pelicula, id);
    }

    // Eliminar una película
    @DeleteMapping("/eliminar/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> eliminarPelicula(@PathVariable long id) {
        return this.peliculaService.deletePelicula(id);
    }

    // Obtener películas por género
    @GetMapping("/genero/{genero}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> getPeliculasByGenero(@PathVariable String genero) {
        return this.peliculaService.getPeliculasByGenero(genero);
    }

    // Obtener películas por director
    @GetMapping("/director/{director}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> getPeliculasByDirector(@PathVariable String director) {
        return this.peliculaService.getPeliculasByDirector(director);
    }
}