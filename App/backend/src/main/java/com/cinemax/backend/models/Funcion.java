package com.cinemax.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

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
    @JsonIgnoreProperties({ "funciones", "asientos", "cine" })
    private Sala idSala;

    @Column(name = "FECHA_HORA", nullable = false)
    private LocalDateTime fechaHora;

    @Column(name = "PRECIO", nullable = false, precision = 10, scale = 2)
    private long precio;

    @OneToMany(mappedBy = "idFuncion")
    @JsonManagedReference
    @JsonIgnoreProperties({ "idFuncion", "idAsiento" })
    private List<DisponibilidadAsiento> dispoAsientos;

    @OneToMany(mappedBy = "funcion")
    private List<Ticket> tickets;

    public Funcion(Pelicula idPelicula, Sala idSala, LocalDateTime fechaHora, long precio) {
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

    public LocalDateTime getFechaHora() {
        return fechaHora;
    }

    public void setFechaHora(LocalDateTime fechaHora) {
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