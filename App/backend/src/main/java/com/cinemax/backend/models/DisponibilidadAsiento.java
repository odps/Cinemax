package com.cinemax.backend.models;

import jakarta.persistence.*;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "DISPONIBILIDAD_ASIENTO")
public class DisponibilidadAsiento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_DISPONIBILIDAD", nullable = false)
    private long id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "ID_ASIENTO", nullable = false)
    private Asiento idAsiento;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "ID_FUNCION", nullable = false)
    @JsonManagedReference
    private Funcion idFuncion;

    @Column(name = "ESTADO", nullable = false, length = 20)
    private String estado;

    @Column(name = "BLOQUEADO_HASTA")
    private LocalDate bloqueadoHasta;

    public DisponibilidadAsiento(long id, Asiento idAsiento, Funcion idFuncion, String estado,
            LocalDate bloqueadoHasta) {
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

    public LocalDate getBloqueadoHasta() {
        return bloqueadoHasta;
    }

    public void setBloqueadoHasta(LocalDate bloqueadoHasta) {
        this.bloqueadoHasta = bloqueadoHasta;
    }
}