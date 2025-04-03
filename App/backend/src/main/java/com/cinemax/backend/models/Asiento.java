package com.cinemax.backend.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "ASIENTO")
public class Asiento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_ASIENTO", nullable = false)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "ID_SALA", nullable = false)
    private Sala idSala;

    @Column(name = "FILA", nullable = false, length = 2)
    private String fila;

    @Column(name = "NUMERO", nullable = false)
    private long numero;

    @OneToMany(mappedBy = "idAsiento")
    private List<DisponibilidadAsiento> dispoAsientos;

    @OneToMany(mappedBy = "asiento")
    private List<Ticket> tickets;


}