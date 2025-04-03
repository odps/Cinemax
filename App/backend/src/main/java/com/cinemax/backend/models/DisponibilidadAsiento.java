package com.cinemax.backend.models;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "DISPONIBILIDAD_ASIENTO")
public class DisponibilidadAsiento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_DISPONIBILIDAD", nullable = false)
    private long id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "ID_ASIENTO", nullable = false)
    private Asiento idAsiento;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "ID_FUNCION", nullable = false)
    private Funcion idFuncion;

    @Column(name = "ESTADO", nullable = false, length = 20)
    private String estado;

    @Column(name = "BLOQUEADO_HASTA")
    private LocalDate bloqueadoHasta;


}