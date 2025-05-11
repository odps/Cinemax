package com.cinemax.backend.services.implementations;

import com.cinemax.backend.models.DisponibilidadAsiento;
import com.cinemax.backend.models.Ticket;
import com.cinemax.backend.models.Factura;
import com.cinemax.backend.repositories.DisponibilidadAsientoRepo;
import com.cinemax.backend.repositories.TicketRepo;
import com.cinemax.backend.repositories.FacturaRepo;
import com.cinemax.backend.services.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TicketServiceImp implements TicketService {

    @Autowired
    TicketRepo ticketRepo;

    @Autowired
    private DisponibilidadAsientoRepo disponibilidadAsientoRepo;

    @Autowired
    private FacturaRepo facturaRepo;

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

    @Transactional
    @Override
    // Posibles estados de asiento: ('disponible', 'reservado', 'ocupado')
    public ResponseEntity<?> comprarTicket(Ticket ticket) {
        Long idAsiento = ticket.getAsiento().getId();
        Long idFuncion = ticket.getFuncion().getId();

        DisponibilidadAsiento asiento = disponibilidadAsientoRepo.findByIdAsientoIdAndIdFuncionId(idAsiento, idFuncion);

        if (asiento == null) {
            return ResponseEntity.badRequest().body("Ha ocurrido un error, Asiento no disponible.");
        }

        if (!"disponible".equals(asiento.getEstado())) {
            return ResponseEntity.badRequest().body("El asiento no está disponible.");
        }

        asiento.setEstado("ocupado");
        disponibilidadAsientoRepo.save(asiento);
        ticketRepo.save(ticket);
        ticketRepo.flush(); // Ensure ticket is persisted and has ID

        // --- Factura Generation ---
        Factura factura = new Factura();
        factura.setTicket(ticket);
        factura.setUsuario(ticket.getUsuario());
        factura.setMontoTotal(ticket.getFuncion().getPrecio());
        factura.setMetodoPago("tarjeta"); // Default, can be updated if payment info is sent
        factura.setEstado("pagada");
        factura.setFechaEmision(LocalDate.now());
        facturaRepo.save(factura);

        Map<String, Object> response = new HashMap<>();
        response.put("ticket", ticket);
        response.put("factura", factura);
        return ResponseEntity.ok(response);
    }
}