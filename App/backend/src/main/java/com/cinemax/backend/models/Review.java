package com.cinemax.backend.models;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;

@Entity
@Table(name = "REVIEW", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"ID_USUARIO", "ID_CINE"})
})
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

    public Review(Usuario usuario, Cine cine, long puntuacion, String comentario) {
        this.usuario = usuario;
        this.cine = cine;
        this.puntuacion = puntuacion;
        this.comentario = comentario;
    }

    public Review() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Cine getCine() {
        return cine;
    }

    public void setCine(Cine cine) {
        this.cine = cine;
    }

    public long getPuntuacion() {
        return puntuacion;
    }

    public void setPuntuacion(long puntuacion) {
        this.puntuacion = puntuacion;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public LocalDate getFechaReview() {
        return fechaReview;
    }

    public void setFechaReview(LocalDate fechaReview) {
        this.fechaReview = fechaReview;
    }
}