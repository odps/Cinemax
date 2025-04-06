package com.cinemax.backend.repositories;

import com.cinemax.backend.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepo extends JpaRepository<Usuario, Long>, JpaSpecificationExecutor<Usuario> {
    Usuario findByCorreo(String correo);
}