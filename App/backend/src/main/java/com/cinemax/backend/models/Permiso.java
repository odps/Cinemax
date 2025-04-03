package com.cinemax.backend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "PERMISO")
public class Permiso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_PERMISO", nullable = false)
    private long id;

    @Column(name = "NOMBRE_PERMISO", nullable = false, length = 100)
    private String nombre;

    /*Pendiente de establecer relacion con permisos en jointable*/

}