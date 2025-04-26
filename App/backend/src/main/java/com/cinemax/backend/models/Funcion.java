package com.cinemax.backend.models;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "FUNCION")
public class Funcion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_FUNCION", nullable = false)
    private long id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "ID_PELICULA", nullable = false)
    @JsonIgnoreProperties("funciones")
    private Pelicula idPelicula;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "ID_SALA", nullable = false)
    @JsonIgnoreProperties("funciones")
    private Sala idSala;

    @Column(name = "FECHA_HORA", nullable = false)
    private LocalDate fechaHora;

    @Column(name = "PRECIO", nullable = false, precision = 10, scale = 2)
    private long precio;

    @OneToMany(mappedBy = "idFuncion")
    private List<DisponibilidadAsiento> dispoAsientos;

    @OneToMany(mappedBy = "funcion")
    private List<Ticket> tickets;

    public Funcion(Pelicula idPelicula, Sala idSala, LocalDate fechaHora, long precio) {
        this.idPelicula = idPelicula;
        this.idSala = idSala;
        this.fechaHora = fechaHora;
        this.precio = precio;
    }

    public Funcion() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Pelicula getIdPelicula() {
        return idPelicula;
    }

    public void setIdPelicula(Pelicula idPelicula) {
        this.idPelicula = idPelicula;
    }

    public Sala getIdSala() {
        return idSala;
    }

    public void setIdSala(Sala idSala) {
        this.idSala = idSala;
    }

    public LocalDate getFechaHora() {
        return fechaHora;
    }

    public void setFechaHora(LocalDate fechaHora) {
        this.fechaHora = fechaHora;
    }

    public long getPrecio() {
        return precio;
    }

    public void setPrecio(long precio) {
        this.precio = precio;
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