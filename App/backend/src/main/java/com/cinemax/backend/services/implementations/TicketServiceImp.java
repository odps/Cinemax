package com.cinemax.backend.services.implementations;

import com.cinemax.backend.models.Ticket;
import com.cinemax.backend.repositories.TicketRepo;
import com.cinemax.backend.services.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketServiceImp implements TicketService {

    @Autowired
    TicketRepo ticketRepo;

    @Override
    public ResponseEntity<?> getTickets() {
        List<Ticket> tickets = ticketRepo.findAll();
        if (tickets.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(tickets);
        }
    }

    @Override
    public ResponseEntity<?> getTicket(long id) {
        Ticket ticket = ticketRepo.findById(id).orElse(null);
        if (ticket == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(ticket);
        }
    }

    @Override
    public ResponseEntity<?> createTicket(Ticket ticket) {
        ticketRepo.save(ticket);
        return ResponseEntity.ok(ticket);
    }

    @Override
    public ResponseEntity<?> updateTicket(Ticket ticket, long id) {
        Ticket ticketOld = ticketRepo.findById(id).orElse(null);
        if (ticketOld == null) {
            return ResponseEntity.badRequest().body("Ticket no encontrado");
        } else {
            if (ticket.getUsuario() != null) {
                ticketOld.setUsuario(ticket.getUsuario());
            }
            if (ticket.getFuncion() != null) {
                ticketOld.setFuncion(ticket.getFuncion());
            }
            if (ticket.getAsiento() != null) {
                ticketOld.setAsiento(ticket.getAsiento());
            }
            ticketRepo.save(ticketOld);
            return ResponseEntity.ok(ticketOld);
        }
    }

    @Override
    public ResponseEntity<?> deleteTicket(long id) {
        if (ticketRepo.existsById(id)) {
            ticketRepo.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<?> getTicketsByUsuarioId(long usuarioId) {
        List<Ticket> tickets = ticketRepo.findByUsuarioId(usuarioId);
        if (tickets.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(tickets);
        }
    }

    @Override
    public ResponseEntity<?> getTicketsByFuncionId(long funcionId) {
        List<Ticket> tickets = ticketRepo.findByFuncionId(funcionId);
        if (tickets.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(tickets);
        }
    }
}