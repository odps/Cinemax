package com.cinemax.backend.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "PELICULA")
public class Pelicula {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_PELICULA", nullable = false)
    private long id;

    @Column(name = "TITULO", nullable = false, length = 200)
    private String titulo;

    @Column(name = "GENERO", nullable = false, length = 50)
    private String genero;

    @Column(name = "DURACION", nullable = false)
    private long duracion;

    @Column(name = "LIMITE_EDAD", length = 10)
    private String limiteEdad;

    @Column(name = "DIRECTOR", length = 100)
    private String director;

    @Column(name = "DESCRIPCION")
    private String descripcion;

    @OneToMany(mappedBy = "idPelicula")
    private List<Funcion> funciones;
}