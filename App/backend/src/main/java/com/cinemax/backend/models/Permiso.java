package com.cinemax.backend.models;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "PERMISO")
public class Permiso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_PERMISO", nullable = false)
    private long id;

    @Column(name = "NOMBRE_PERMISO", nullable = false, length = 100)
    private String nombre;

    @ManyToMany(mappedBy = "permisos", fetch = FetchType.EAGER)
    private Set<Rol> roles = new HashSet<>();

    public Permiso(String nombre) {
        this.nombre = nombre;
    }

    public Permiso() {
    }

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

    public Set<Rol> getRoles() {
        return roles;
    }

    public void setRoles(Set<Rol> roles) {
        this.roles = roles;
    }
}