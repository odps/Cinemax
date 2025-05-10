package com.cinemax.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "PELICULA")
public class Pelicula {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_PELICULA", nullable = false)
    private long id;

    @Column(name = "TITULO", nullable = false, length = 200)
    private String titulo;

    @Column(name = "GENERO", nullable = false, length = 50)
    private String genero;

    @Column(name = "DURACION", nullable = false)
    private long duracion;

    @Column(name = "LIMITE_EDAD", length = 10)
    private String limiteEdad;

    @Column(name = "DIRECTOR", length = 100)
    private String director;

    @Column(name = "DESCRIPCION")
    @Lob
    private String descripcion;

    @Column(name = "IMAGENURL", length = 100)
    private String imagenUrl;

    @OneToMany(mappedBy = "idPelicula")
    @JsonIgnoreProperties({"idPelicula", "dispoAsientos", "tickets"})
    private List<Funcion> funciones;

    public Pelicula(String titulo, String genero, long duracion, String limiteEdad, String director, String descripcion,
                    String imagenUrl) {
        this.titulo = titulo;
        this.genero = genero;
        this.duracion = duracion;
        this.limiteEdad = limiteEdad;
        this.director = director;
        this.descripcion = descripcion;
        this.imagenUrl = imagenUrl;
    }

    public Pelicula() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public long getDuracion() {
        return duracion;
    }

    public void setDuracion(long duracion) {
        this.duracion = duracion;
    }

    public String getLimiteEdad() {
        return limiteEdad;
    }

    public void setLimiteEdad(String limiteEdad) {
        this.limiteEdad = limiteEdad;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getImagenUrl() {
        return imagenUrl;
    }

    public void setImagenUrl(String imagenUrl) {
        this.imagenUrl = imagenUrl;
    }

    public List<Funcion> getFunciones() {
        return funciones;
    }

    public void setFunciones(List<Funcion> funciones) {
        this.funciones = funciones;
    }
}