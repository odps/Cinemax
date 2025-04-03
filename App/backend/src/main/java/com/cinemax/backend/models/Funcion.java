package com.cinemax.backend.models;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "FUNCION")
public class Funcion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_FUNCION", nullable = false)
    private long id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "ID_PELICULA", nullable = false)
    private Pelicula idPelicula;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "ID_SALA", nullable = false)
    private Sala idSala;

    @Column(name = "FECHA_HORA", nullable = false)
    private LocalDate fechaHora;

    @Column(name = "PRECIO", nullable = false, precision = 10, scale = 2)
    private long precio;

    @OneToMany(mappedBy = "idFuncion")
    private List<DisponibilidadAsiento> dispoAsientos;

    @OneToMany(mappedBy = "funcion")
    private List<Ticket> tickets;


}