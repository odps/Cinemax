package com.cinemax.backend.controllers;

import com.cinemax.backend.models.Usuario;
import com.cinemax.backend.services.implementations.UsuarioServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

// Controlador REST para la gestión de usuarios
@RestController
@EnableMethodSecurity
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioServiceImp usuarioService;

    @Autowired

    // Obtener la lista de todos los usuarios (solo ADMIN)
    @GetMapping("/lista")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> listaUsuarios() {
        return this.usuarioService.getUsuarios();
    }

    // Obtener un usuario por su ID (solo ADMIN)
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> getUsuarioById(@PathVariable long id) {
        return this.usuarioService.getUsuario(id);
    }

    // Crear un nuevo usuario (solo ADMIN)
    @PostMapping("/crear")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> crearUsuario(@RequestBody Usuario usuario) {
        return this.usuarioService.createUsuario(usuario);
    }

    // Modificar un usuario existente (solo ADMIN)
    @PutMapping("/editar/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> modificarUsuario(@RequestBody Usuario usuario, @PathVariable long id) {
        return this.usuarioService.updateUsuario(usuario, id);
    }

    // Eliminar un usuario por su ID (solo ADMIN)
    @DeleteMapping("/eliminar/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> eliminarUsuario(@PathVariable long id) {
        return this.usuarioService.deleteUsuario(id);
    }

    // Controladores para permitir al usuario gestionar sus propios datos
    @GetMapping("/perfil")
    public ResponseEntity<?> obtenerPerfilUsuario(Authentication authentication) {
        String correo = authentication.getName();
        return this.usuarioService.getUsuarioByCorreo(correo);
    }

    @PutMapping("/perfil")
    public ResponseEntity<?> actualizarPerfilUsuario(@RequestBody Usuario usuario, Authentication authentication) {
        String correo = authentication.getName();
        return this.usuarioService.updatePerfilUsuario(usuario, correo);
    }
}