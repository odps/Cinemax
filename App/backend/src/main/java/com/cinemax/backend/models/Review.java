package com.cinemax.backend.models;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;

@Entity
@Table(name = "REVIEW")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_REVIEW", nullable = false)
    private long id;

    @ManyToOne
    @JoinColumn(name = "ID_USUARIO", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "ID_CINE", nullable = false)
    private Cine cine;

    @Column(name = "PUNTUACION", nullable = false)
    private long puntuacion;

    @Column(name = "COMENTARIO", nullable = false)
    private String comentario;

    @CreationTimestamp
    @Column(name = "FECHA_REVIEW", nullable = false)
    private LocalDate fechaReview;
}