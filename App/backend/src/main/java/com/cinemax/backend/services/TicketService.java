package com.cinemax.backend.services;

import com.cinemax.backend.models.Ticket;
import org.springframework.http.ResponseEntity;
import com.cinemax.backend.dto.TicketCompraRequest;

public interface TicketService {
    ResponseEntity<?> getTickets();

    ResponseEntity<?> getTicket(long id);

    ResponseEntity<?> createTicket(Ticket ticket);

    ResponseEntity<?> updateTicket(Ticket ticket, long id);

    ResponseEntity<?> deleteTicket(long id);

    ResponseEntity<?> getTicketsByUsuarioId(long usuarioId);

    ResponseEntity<?> getTicketsByFuncionId(long funcionId);

    ResponseEntity<?> comprarTicket(TicketCompraRequest request);
}