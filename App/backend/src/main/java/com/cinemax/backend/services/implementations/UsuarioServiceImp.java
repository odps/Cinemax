package com.cinemax.backend.services.implementations;

import com.cinemax.backend.models.Permiso;
import com.cinemax.backend.models.Rol;
import com.cinemax.backend.models.Usuario;
import com.cinemax.backend.repositories.PermisoRepo;
import com.cinemax.backend.repositories.RolRepo;
import com.cinemax.backend.repositories.UsuarioRepo;
import com.cinemax.backend.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UsuarioServiceImp implements UsuarioService {

    private final RolServiceImp rolServiceImp;

    @Autowired
    RolRepo rolRepo;

    @Autowired
    UsuarioRepo usuarioRepo;

    @Autowired
    PermisoRepo permisoRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    UsuarioServiceImp(RolRepo rolRepo, RolServiceImp rolServiceImp) {
        this.rolRepo = rolRepo;
        this.rolServiceImp = rolServiceImp;
    }

    @Override
    public ResponseEntity<?> getUsuarios() {
        List<Usuario> usuarios = usuarioRepo.findAll();
        if (usuarios.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(usuarios);
        }
    }

    @Override
    public ResponseEntity<?> getUsuario(long id) {
        Usuario usuario = usuarioRepo.findById(id).orElse(null);
        if (usuario == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(usuario);
        }
    }

    @Override
    public ResponseEntity<?> createUsuario(Usuario usuario) {
        Usuario checkUsuario = usuarioRepo.findByCorreo(usuario.getCorreo());
        if (checkUsuario != null) {
            return ResponseEntity.badRequest().body("Email ocupado");
        } else {
            Rol userRol = rolRepo.findByNombre("CLIENT");
            if (userRol == null) {

                Permiso userPermiso = permisoRepo.findByNombre("USER");
                if (userPermiso == null) {
                    userPermiso = new Permiso();
                    userPermiso.setNombre("USER");
                    permisoRepo.save(userPermiso);
                }

                Set<Permiso> permisos = new HashSet<>();
                permisos.add(userPermiso);

                userRol = new Rol();
                userRol.setPermisos(permisos);
                userRol.setNombre("CLIENT");
                rolServiceImp.createRol(userRol);
            }
            usuario.setRol(userRol);
            usuario.setContrasena(passwordEncoder.encode(usuario.getContrasena()));
            usuarioRepo.save(usuario);
            return ResponseEntity.ok(usuario);
        }
    }

    @Override
    public ResponseEntity<?> updateUsuario(Usuario usuario, long id) {
        Usuario userOld = usuarioRepo.findById(id).orElse(null);
        if (userOld == null) {
            return ResponseEntity.badRequest().body("Usuario no encontrado");
        } else {
            if (usuario.getCorreo() != null) {
                userOld.setCorreo(usuario.getCorreo());
            }
            if (usuario.getNombre() != null) {
                userOld.setNombre(usuario.getNombre());
            }
            usuarioRepo.save(userOld);
            return ResponseEntity.ok(userOld);
        }
    }

    @Override
    public ResponseEntity<?> deleteUsuario(long id) {
        if (usuarioRepo.existsById(id)) {
            usuarioRepo.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<?> getUsuarioByCorreo(String correo) {
        Usuario usuario = usuarioRepo.findByCorreo(correo);
        if (usuario == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(usuario);
        }
    }
}
