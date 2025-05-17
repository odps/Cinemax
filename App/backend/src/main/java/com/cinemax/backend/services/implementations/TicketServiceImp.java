package com.cinemax.backend.services.implementations;

import com.cinemax.backend.dto.TicketCompraRequest;
import com.cinemax.backend.models.*;
import com.cinemax.backend.repositories.*;
import com.cinemax.backend.services.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Autowired
    private UsuarioRepo usuarioRepo;

    @Autowired
    private FuncionRepo funcionRepo;

    @Autowired
    private AsientoRepo asientoRepo;

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
            // Solo se actualizan los campos que vienen con datos válidos
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
    public ResponseEntity<?> comprarTicket(TicketCompraRequest request) {
        // Validación de existencia de usuario, función y asiento
        Usuario usuario = usuarioRepo.findById(request.getUsuarioId()).orElse(null);
        Funcion funcion = funcionRepo.findById(request.getFuncionId()).orElse(null);
        Asiento asiento = asientoRepo.findById(request.getAsientoId()).orElse(null);
        if (usuario == null || funcion == null || asiento == null) {
            return ResponseEntity.badRequest().body("Datos de usuario, función o asiento inválidos");
        }
        // Verifica que el asiento esté disponible o reservado antes de comprar
        DisponibilidadAsiento disponibilidad = disponibilidadAsientoRepo
                .findByIdAsientoIdAndIdFuncionId(asiento.getId(), funcion.getId());
        if (disponibilidad == null ||
                (!"disponible".equalsIgnoreCase(disponibilidad.getEstado()) &&
                        !"reservado".equalsIgnoreCase(disponibilidad.getEstado()))) {
            return ResponseEntity.badRequest().body("El asiento no está disponible.");
        }
        disponibilidad.setEstado("ocupado");
        disponibilidadAsientoRepo.save(disponibilidad);
        Ticket ticket = new Ticket();
        ticket.setUsuario(usuario);
        ticket.setFuncion(funcion);
        ticket.setAsiento(asiento);
        ticketRepo.save(ticket);
        ticketRepo.flush();
        // Determina el monto total a cobrar
        long montoTotal = (request.getMontoTotal() != null && request.getMontoTotal() > 0)
                ? request.getMontoTotal()
                : (funcion.getPrecio() > 0 ? funcion.getPrecio() : 0);
        Factura factura = new Factura();
        factura.setTicket(ticket);
        factura.setUsuario(usuario);
        factura.setMontoTotal(montoTotal);
        factura.setMetodoPago(request.getMetodoPago() != null ? request.getMetodoPago() : "tarjeta");
        factura.setEstado("pagada");
        factura.setFechaEmision(java.time.LocalDateTime.now());
        facturaRepo.save(factura);
        // Respuesta con ticket y factura generados
        Map<String, Object> response = new java.util.HashMap<>();
        response.put("ticket", ticket);
        response.put("factura", factura);
        return ResponseEntity.ok(response);
    }
}