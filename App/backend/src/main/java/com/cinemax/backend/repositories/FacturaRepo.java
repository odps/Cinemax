package com.cinemax.backend.repositories;

import com.cinemax.backend.models.Factura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FacturaRepo extends JpaRepository<Factura, Long>, JpaSpecificationExecutor<Factura> {
    List<Factura> findByUsuarioId(long usuarioId);

    List<Factura> findByEstado(String estado);
}