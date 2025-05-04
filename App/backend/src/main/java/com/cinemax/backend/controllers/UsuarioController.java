package com.cinemax.backend.controllers;

import com.cinemax.backend.models.Usuario;
import com.cinemax.backend.services.implementations.UsuarioServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

@RestController
@EnableMethodSecurity
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioServiceImp usuarioService;

    @Autowired

    // Recoger informacion de los usuarios
    @GetMapping("/lista")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> listaUsuarios() {
        return this.usuarioService.getUsuarios();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> getUsuarioById(@PathVariable long id) {
        return this.usuarioService.getUsuario(id);
    }

    // Crear Usuarios
    @PostMapping("/crear")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> crearUsuario(@RequestBody Usuario usuario) {
        return this.usuarioService.createUsuario(usuario);
    }

    // Modificar Usuarios
    @PutMapping("/editar/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> modificarUsuario(@RequestBody Usuario usuario, @PathVariable long id) {
        return this.usuarioService.updateUsuario(usuario, id);
    }

    // Eliminar Usuarios
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