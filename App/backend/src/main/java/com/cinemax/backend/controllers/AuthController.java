package com.cinemax.backend.controllers;

import com.cinemax.backend.models.AuthUser;
import com.cinemax.backend.models.Usuario;
import com.cinemax.backend.services.implementations.CustomUserDetailsService;
import com.cinemax.backend.services.implementations.UsuarioServiceImp;
import com.cinemax.backend.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@EnableMethodSecurity()
@RequestMapping("/")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private UsuarioServiceImp usuarioService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public String registerUser(@RequestBody Usuario usuario) {
        try {
            usuarioService.createUsuario(usuario);
            return "Usuario registrado exitosamente";
        } catch (Exception e) {
            return "Ha ocurrido un error al registrar el usuario: " + e.getMessage();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Usuario authUsuario) {
        try {
            System.out.println("=== Intentando autenticación para el usuario: " + authUsuario.getCorreo());

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authUsuario.getCorreo(), authUsuario.getContrasena())
            );

            System.out.println("=== Autenticación exitosa");

            final UserDetails userDetails = userDetailsService.loadUserByUsername(authUsuario.getCorreo());
            final String jwt = jwtUtil.generateToken(userDetails);

            final Usuario usuario = (Usuario) usuarioService.getUsuarioByCorreo(authUsuario.getCorreo()).getBody();

            return ResponseEntity.ok(new AuthUser(jwt, usuario));
        } catch (Exception e) {
            System.out.println("=== Fallo en la autenticación: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(401).body("Fallo en la autenticación: " + e.getMessage());
        }
    }
}