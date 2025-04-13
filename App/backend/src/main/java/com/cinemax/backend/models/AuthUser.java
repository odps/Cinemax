package com.cinemax.backend.models;

public class AuthUser {
    public String token;
    public Usuario user;

    public AuthUser(String token, Usuario user) {
        this.token = token;
        this.user = user;
    }
}
