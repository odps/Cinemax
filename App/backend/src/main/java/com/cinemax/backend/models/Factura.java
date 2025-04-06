package com.cinemax.backend.models;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;

@Entity
@Table(name = "FACTURA")
public class Factura {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_FACTURA", nullable = false)
    private long id;

    @OneToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "ID_TICKET", nullable = false)
    private Ticket ticket;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "ID_USUARIO", nullable = false)
    private Usuario usuario;

    @CreationTimestamp
    @Column(name = "FECHA_EMISION", nullable = false)
    private LocalDate fechaEmision;

    @Column(name = "MONTO_TOTAL", nullable = false, precision = 10, scale = 2)
    private long montoTotal;

    @Column(name = "METODO_PAGO", nullable = false, length = 50)
    private String metodoPago;

    @Column(name = "ESTADO", nullable = false, length = 20)
    private String estado;

    public Factura(Ticket ticket, Usuario usuario, LocalDate fechaEmision, long montoTotal, String metodoPago, String estado) {
        this.ticket = ticket;
        this.usuario = usuario;
        this.fechaEmision = fechaEmision;
        this.montoTotal = montoTotal;
        this.metodoPago = metodoPago;
        this.estado = estado;
    }

    public Factura() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Ticket getTicket() {
        return ticket;
    }

    public void setTicket(Ticket ticket) {
        this.ticket = ticket;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public LocalDate getFechaEmision() {
        return fechaEmision;
    }

    public void setFechaEmision(LocalDate fechaEmision) {
        this.fechaEmision = fechaEmision;
    }

    public long getMontoTotal() {
        return montoTotal;
    }

    public void setMontoTotal(long montoTotal) {
        this.montoTotal = montoTotal;
    }

    public String getMetodoPago() {
        return metodoPago;
    }

    public void setMetodoPago(String metodoPago) {
        this.metodoPago = metodoPago;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}