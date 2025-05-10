package com.cinemax.backend.controllers;

import com.cinemax.backend.models.Ticket;
import com.cinemax.backend.services.implementations.TicketServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;

@RestController
@EnableMethodSecurity
@RequestMapping("/ticket")
public class TicketController {

    @Autowired
    private TicketServiceImp ticketService;

    // Obtener todos los tickets
    @GetMapping("/lista")
    // @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> listaTickets() {
        return this.ticketService.getTickets();
    }

    // Obtener un ticket por ID
    @GetMapping("/{id}")
    // @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> getTicketById(@PathVariable long id) {
        return this.ticketService.getTicket(id);
    }

    // Crear un ticket
    @PostMapping("/crear")
    // @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> crearTicket(@RequestBody Ticket ticket) {
        return this.ticketService.createTicket(ticket);
    }

    // Modificar un ticket
    @PutMapping("/editar/{id}")
    // @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> modificarTicket(@RequestBody Ticket ticket, @PathVariable long id) {
        return this.ticketService.updateTicket(ticket, id);
    }

    // Eliminar un ticket
    @DeleteMapping("/eliminar/{id}")
    // @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<?> eliminarTicket(@PathVariable long id) {
        return this.ticketService.deleteTicket(id);
    }

    // Obtener tickets por ID de usuario
    @GetMapping("/usuario/{usuarioId}")
    // @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> getTicketsByUsuarioId(@PathVariable long usuarioId) {
        return this.ticketService.getTicketsByUsuarioId(usuarioId);
    }

    // Obtener tickets por ID de función
    @GetMapping("/funcion/{funcionId}")
    // @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> getTicketsByFuncionId(@PathVariable long funcionId) {
        return this.ticketService.getTicketsByFuncionId(funcionId);
    }

    // Controlador dedicado solo para la compra de tickets
    @PostMapping("/comprar")
    // @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<?> comprarTicket(@RequestBody Ticket ticket) {
        return this.ticketService.comprarTicket(ticket);
    }
}