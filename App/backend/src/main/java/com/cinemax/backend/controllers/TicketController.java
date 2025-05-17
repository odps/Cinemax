package com.cinemax.backend.controllers;

import com.cinemax.backend.dto.TicketCompraRequest;
import com.cinemax.backend.models.Ticket;
import com.cinemax.backend.services.implementations.TicketServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;

@RestController
@EnableMethodSecurity
@RequestMapping("/ticket")
// Controlador REST para la gestión de tickets y compra de boletos
public class TicketController {

    @Autowired
    private TicketServiceImp ticketService;

    // Obtener todos los tickets
    @GetMapping("/lista")
    public ResponseEntity<?> listaTickets() {
        return this.ticketService.getTickets();
    }

    // Obtener un ticket por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getTicketById(@PathVariable long id) {
        return this.ticketService.getTicket(id);
    }

    // Crear un ticket
    @PostMapping("/crear")
    public ResponseEntity<?> crearTicket(@RequestBody Ticket ticket) {
        return this.ticketService.createTicket(ticket);
    }

    // Modificar un ticket
    @PutMapping("/editar/{id}")
    public ResponseEntity<?> modificarTicket(@RequestBody Ticket ticket, @PathVariable long id) {
        return this.ticketService.updateTicket(ticket, id);
    }

    // Eliminar un ticket
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarTicket(@PathVariable long id) {
        return this.ticketService.deleteTicket(id);
    }

    // Obtener tickets por ID de usuario
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<?> getTicketsByUsuarioId(@PathVariable long usuarioId) {
        return this.ticketService.getTicketsByUsuarioId(usuarioId);
    }

    // Obtener tickets por ID de función
    @GetMapping("/funcion/{funcionId}")
    public ResponseEntity<?> getTicketsByFuncionId(@PathVariable long funcionId) {
        return this.ticketService.getTicketsByFuncionId(funcionId);
    }

    // Controlador dedicado solo para la compra de tickets
    @PostMapping("/comprar")
    public ResponseEntity<?> comprarTicket(@RequestBody TicketCompraRequest request) {
        return this.ticketService.comprarTicket(request);
    }
}