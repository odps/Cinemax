package com.cinemax.backend.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "CINE")
public class Cine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_CINE", nullable = false)
    private long id;

    @Column(name = "NOMBRE", nullable = false, length = 100)
    private String nombre;

    @Column(name = "DIRECCION", nullable = false, length = 200)
    private String direccion;

    @Column(name = "CIUDAD", nullable = false, length = 100)
    private String ciudad;

    @Column(name = "NIF", nullable = false, length = 20, unique = true)
    private String nif;

    @OneToMany(mappedBy = "cine")
    private List<Review> reviews;

    @OneToMany(mappedBy = "cine")
    private List<Sala> salas;
}