package com.cinemax.backend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "ROL")
public class Rol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_ROL", nullable = false)
    private long id;

    @Column(name = "NOMBRE_ROL", nullable = false, length = 50)
    private String nombre;

    /*Pendiente de establecer relacion con permisos en jointable*/

}