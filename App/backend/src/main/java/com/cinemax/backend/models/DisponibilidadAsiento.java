package com.cinemax.backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "DISPONIBILIDAD_ASIENTO")
public class DisponibilidadAsiento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_DISPONIBILIDAD", nullable = false)
    private long id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "ID_ASIENTO", nullable = false)
    @JsonIgnoreProperties({ "dispoAsientos", "tickets" })
    private Asiento idAsiento;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "ID_FUNCION", nullable = false)
    @JsonBackReference
    @JsonIgnoreProperties({ "dispoAsientos", "idSala" })
    private Funcion idFuncion;

    @Column(name = "ESTADO", nullable = false, length = 20)
    private String estado;

    @Column(name = "BLOQUEADO_HASTA")
    private LocalDateTime bloqueadoHasta;

    public DisponibilidadAsiento(long id, Asiento idAsiento, Funcion idFuncion, String estado,
            LocalDateTime bloqueadoHasta) {
        this.id = id;
        this.idAsiento = idAsiento;
        this.idFuncion = idFuncion;
        this.estado = estado;
        this.bloqueadoHasta = bloqueadoHasta;
    }

    public DisponibilidadAsiento() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Asiento getIdAsiento() {
        return idAsiento;
    }

    public void setIdAsiento(Asiento idAsiento) {
        this.idAsiento = idAsiento;
    }

    public Funcion getIdFuncion() {
        return idFuncion;
    }

    public void setIdFuncion(Funcion idFuncion) {
        this.idFuncion = idFuncion;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public LocalDateTime getBloqueadoHasta() {
        return bloqueadoHasta;
    }

    public void setBloqueadoHasta(LocalDateTime bloqueadoHasta) {
        this.bloqueadoHasta = bloqueadoHasta;
    }
}