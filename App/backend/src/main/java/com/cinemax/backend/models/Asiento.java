package com.cinemax.backend.models;

import jakarta.persistence.*;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "ASIENTO")
public class Asiento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_ASIENTO", nullable = false)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "ID_SALA", nullable = false)
    @JsonIgnoreProperties("asientos")
    private Sala idSala;

    @Column(name = "FILA", nullable = false, length = 2)
    private String fila;

    @Column(name = "NUMERO", nullable = false)
    private long numero;

    @OneToMany(mappedBy = "idAsiento")
    @JsonIgnore
    private List<DisponibilidadAsiento> dispoAsientos;

    @OneToMany(mappedBy = "asiento")
    @JsonIgnore
    private List<Ticket> tickets;

    public Asiento(Sala idSala, String fila, long numero) {
        this.idSala = idSala;
        this.fila = fila;
        this.numero = numero;
    }

    public Asiento() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Sala getIdSala() {
        return idSala;
    }

    public void setIdSala(Sala idSala) {
        this.idSala = idSala;
    }

    public String getFila() {
        return fila;
    }

    public void setFila(String fila) {
        this.fila = fila;
    }

    public long getNumero() {
        return numero;
    }

    public void setNumero(long numero) {
        this.numero = numero;
    }

    public List<DisponibilidadAsiento> getDispoAsientos() {
        return dispoAsientos;
    }

    public void setDispoAsientos(List<DisponibilidadAsiento> dispoAsientos) {
        this.dispoAsientos = dispoAsientos;
    }

    public List<Ticket> getTickets() {
        return tickets;
    }

    public void setTickets(List<Ticket> tickets) {
        this.tickets = tickets;
    }
}