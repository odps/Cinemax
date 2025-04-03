package com.cinemax.backend.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "SALA")
public class Sala {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_SALA", nullable = false)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "ID_CINE", nullable = false)
    private Cine cine;

    @Column(name = "NOMBRE_SALA", nullable = false, length = 50)
    private String nombre;

    @Column(name = "CAPACIDAD", nullable = false)
    private Long capacidad;

    @OneToMany(mappedBy = "idSala")
    private List<Asiento> asientos;

    @OneToMany(mappedBy = "idSala")
    private List<Funcion> funciones;

}