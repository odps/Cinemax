package com.cinemax.backend.services;

import com.cinemax.backend.models.Usuario;
import org.springframework.http.ResponseEntity;

public interface UsuarioService {
    ResponseEntity<?> getUsuarios();

    ResponseEntity<?> getUsuario(long id);

    ResponseEntity<?> createUsuario(Usuario usuario);

    ResponseEntity<?> updateUsuario(Usuario usuario, long id);

    ResponseEntity<?> deleteUsuario(long id);

    ResponseEntity<?> getUsuarioByCorreo(String correo);
}