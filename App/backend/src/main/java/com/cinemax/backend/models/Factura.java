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

}