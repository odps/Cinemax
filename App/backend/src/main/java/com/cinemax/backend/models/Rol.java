package com.cinemax.backend.models;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "ROL")
public class Rol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_ROL", nullable = false)
    private long id;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "ROL_PERMISO",
            joinColumns = @JoinColumn(name = "ID_ROL"),
            inverseJoinColumns = @JoinColumn(name = "ID_PERMISO")
    )
    private Set<Permiso> permisos = new HashSet<>();

    @Column(name = "NOMBRE_ROL", nullable = false, length = 50)
    private String nombre;

    @OneToMany(mappedBy = "rol")
    private List<Usuario> usuarios;

    public Rol(Set<Permiso> permisos, String nombre) {
        this.permisos = permisos;
        this.nombre = nombre;
    }

    public Rol() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Set<Permiso> getPermisos() {
        return permisos;
    }

    public void setPermisos(Set<Permiso> permisos) {
        this.permisos = permisos;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public List<Usuario> getUsuarios() {
        return usuarios;
    }

    public void setUsuarios(List<Usuario> usuarios) {
        this.usuarios = usuarios;
    }
}