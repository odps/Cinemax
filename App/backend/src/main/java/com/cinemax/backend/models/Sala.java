package com.cinemax.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "SALA")
public class Sala {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_SALA", nullable = false)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "ID_CINE", nullable = false)
    @JsonIgnoreProperties({ "direccion", "ciudad", "nif", "imagenUrl", "telefono", "descripcion", "horario", "salas",
            "promociones", "hibernateLazyInitializer" })
    private Cine cine;

    @Column(name = "NOMBRE_SALA", nullable = false, length = 50)
    private String nombre;

    @Column(name = "CAPACIDAD", nullable = false)
    private Long capacidad;

    @OneToMany(mappedBy = "idSala", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({ "idSala", "dispoAsientos", "tickets" })
    private List<Asiento> asientos;

    @OneToMany(mappedBy = "idSala", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({ "idSala", "dispoAsientos", "tickets" })
    private List<Funcion> funciones;

    public Sala(Cine cine, String nombre, Long capacidad) {
        this.cine = cine;
        this.nombre = nombre;
        this.capacidad = capacidad;
    }

    public Sala() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Cine getCine() {
        return cine;
    }

    public void setCine(Cine cine) {
        this.cine = cine;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Long getCapacidad() {
        return capacidad;
    }

    public void setCapacidad(Long capacidad) {
        this.capacidad = capacidad;
    }

    public List<Asiento> getAsientos() {
        return asientos;
    }

    public void setAsientos(List<Asiento> asientos) {
        this.asientos = asientos;
    }

    public List<Funcion> getFunciones() {
        return funciones;
    }

    public void setFunciones(List<Funcion> funciones) {
        this.funciones = funciones;
    }
}