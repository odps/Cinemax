package com.cinemax.backend.repositories;

import com.cinemax.backend.models.Log;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LogRepo extends JpaRepository<Log, Long>, JpaSpecificationExecutor<Log> {
    List<Log> findByUsuarioId(long usuarioId);

    List<Log> findByAccion(String accion);
}