package com.cinemax.backend.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "CINE")
public class Cine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_CINE", nullable = false)
    private long id;

    @Column(name = "NOMBRE", nullable = false, length = 100)
    private String nombre;

    @Column(name = "DIRECCION", nullable = false, length = 200)
    private String direccion;

    @Column(name = "CIUDAD", nullable = false, length = 100)
    private String ciudad;

    @Column(name = "NIF", nullable = false, length = 20, unique = true)
    private String nif;

    @Column(name = "IMAGENURL", length = 100)
    private String imagenUrl;

    @Column(name = "TELEFONO", length = 12)
    private String telefono;

    @Column(name = "DESCRIPCION", length = 1000)
    private String descripcion;

    @Column(name = "HORARIO", length = 20)
    private String horario;

    @OneToMany(mappedBy = "cine")
    private List<Review> reviews;

    @OneToMany(mappedBy = "cine")
    private List<Sala> salas;

    @ManyToMany(mappedBy = "cines")
    private List<Promocion> promociones;

    // Updated constructor with all fields
    public Cine(String nif, String ciudad, String direccion, String nombre, String imagenUrl,
            String telefono, String descripcion, String horario) {
        this.nif = nif;
        this.ciudad = ciudad;
        this.direccion = direccion;
        this.nombre = nombre;
        this.imagenUrl = imagenUrl;
        this.telefono = telefono;
        this.descripcion = descripcion;
        this.horario = horario;
    }

    // Keep existing constructors for backward compatibility
    public Cine(String nif, String ciudad, String direccion, String nombre, String imagenUrl) {
        this.nif = nif;
        this.ciudad = ciudad;
        this.direccion = direccion;
        this.nombre = nombre;
        this.imagenUrl = imagenUrl;
    }

    public Cine(String nif, String ciudad, String direccion, String nombre) {
        this.nif = nif;
        this.ciudad = ciudad;
        this.direccion = direccion;
        this.nombre = nombre;
    }

    public Cine() {
    }

    // Existing getters and setters
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getCiudad() {
        return ciudad;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public String getNif() {
        return nif;
    }

    public void setNif(String nif) {
        this.nif = nif;
    }

    public String getImagenUrl() {
        return imagenUrl;
    }

    public void setImagenUrl(String imagenUrl) {
        this.imagenUrl = imagenUrl;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getHorario() {
        return horario;
    }

    public void setHorario(String horario) {
        this.horario = horario;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public List<Sala> getSalas() {
        return salas;
    }

    public void setSalas(List<Sala> salas) {
        this.salas = salas;
    }

    public List<Promocion> getPromociones() {
        return promociones;
    }

    public void setPromociones(List<Promocion> promociones) {
        this.promociones = promociones;
    }
}