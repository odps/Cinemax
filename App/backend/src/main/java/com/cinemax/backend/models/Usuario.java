package com.cinemax.backend.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "USUARIO")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_USUARIO", nullable = false)
    private long id;

    @Column(name = "NOMBRE", length = 100, nullable = false)
    private String nombre;

    @Column(name = "CORREO", length = 100, nullable = false, unique = true)
    private String correo;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(name = "CONTRASEÑA", length = 255, nullable = false)
    private String contrasena;

    @CreationTimestamp
    @Column(name = "FECHA_REGISTRO", nullable = false)
    private LocalDate fechaRegistro;

    @OneToMany(mappedBy = "usuario")
    private List<Review> reviews;

    @OneToMany(mappedBy = "usuario")
    private List<Ticket> tickets;

    @OneToMany(mappedBy = "usuario")
    private List<Factura> facturas;

    @OneToMany(mappedBy = "usuario")
    private List<Log> logs;

}