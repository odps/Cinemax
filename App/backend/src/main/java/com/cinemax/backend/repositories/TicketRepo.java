package com.cinemax.backend.repositories;

import com.cinemax.backend.models.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepo extends JpaRepository<Ticket, Long>, JpaSpecificationExecutor<Ticket> {
    List<Ticket> findByUsuarioId(long usuarioId);

    List<Ticket> findByFuncionId(long funcionId);
}