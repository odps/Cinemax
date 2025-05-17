package com.cinemax.backend.services.implementations;

import com.cinemax.backend.models.Usuario;
import com.cinemax.backend.repositories.UsuarioRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UsuarioRepo usuarioRepo;

    // Mapea el nombre del rol del usuario a la autoridad de Spring Security
    public Collection<GrantedAuthority> mapToAuthorities(String role) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(role));
        return authorities;
    }

    @Override
    public UserDetails loadUserByUsername(String correo) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepo.findByCorreo(correo);
        if (usuario == null) {
            throw new UsernameNotFoundException("Usuario no encontrado");
        }
        // Si el usuario no tiene rol asignado, retorna sin autoridades
        if (usuario.getRol() == null) {
            return new org.springframework.security.core.userdetails.User(
                    usuario.getCorreo(),
                    usuario.getContrasena(),
                    new ArrayList<>());
        }
        // Retorna el usuario con las autoridades correspondientes a su rol
        return new org.springframework.security.core.userdetails.User(
                usuario.getCorreo(),
                usuario.getContrasena(),
                mapToAuthorities(usuario.getRol().getNombre()));
    }
}