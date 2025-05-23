package com.cinemax.backend.services.implementations;

import com.cinemax.backend.models.Funcion;
import com.cinemax.backend.repositories.FuncionRepo;
import com.cinemax.backend.services.FuncionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FuncionServiceImp implements FuncionService {

    @Autowired
    private FuncionRepo funcionRepo;

    @Override
    public ResponseEntity<?> getFunciones() {
        List<Funcion> funciones = funcionRepo.findAll();
        return ResponseEntity.ok(funciones);
    }

    @Override
    public ResponseEntity<?> getFuncion(long id) {
        Funcion funcion = funcionRepo.findById(id).orElse(null);
        if (funcion == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(funcion);
    }

    @Override
    public ResponseEntity<?> createFuncion(Funcion funcion) {
        // Validación de datos obligatorios para crear una función
        if (funcion.getIdPelicula() == null || funcion.getIdSala() == null || funcion.getFechaHora() == null
                || funcion.getPrecio() <= 0) {
            return ResponseEntity.badRequest().body("Datos de función inválidos");
        }
        funcionRepo.save(funcion);
        return ResponseEntity.ok(funcion);
    }

    @Override
    public ResponseEntity<?> updateFuncion(Funcion funcion, long id) {
        Funcion funcionOld = funcionRepo.findById(id).orElse(null);
        if (funcionOld == null) {
            return ResponseEntity.badRequest().body("Función no encontrada");
        }
        // Solo se actualizan los campos que vienen con datos válidos
        if (funcion.getIdPelicula() != null) {
            funcionOld.setIdPelicula(funcion.getIdPelicula());
        }
        if (funcion.getIdSala() != null) {
            funcionOld.setIdSala(funcion.getIdSala());
        }
        if (funcion.getFechaHora() != null) {
            funcionOld.setFechaHora(funcion.getFechaHora());
        }
        if (funcion.getPrecio() > 0) {
            funcionOld.setPrecio(funcion.getPrecio());
        }
        funcionRepo.save(funcionOld);
        return ResponseEntity.ok(funcionOld);
    }

    @Override
    public ResponseEntity<?> deleteFuncion(long id) {
        if (funcionRepo.existsById(id)) {
            funcionRepo.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @Override
    public ResponseEntity<?> getFuncionesByIdPeliculaId(long idPeliculaId) {
        // Devuelve todas las funciones asociadas a una película específica
        List<Funcion> funciones = funcionRepo.findByIdPeliculaId(idPeliculaId);
        return ResponseEntity.ok(funciones);
    }

    @Override
    public ResponseEntity<?> getFuncionesByIdSalaId(long idSalaId) {
        // Devuelve todas las funciones asociadas a una sala específica
        List<Funcion> funciones = funcionRepo.findByIdSalaId(idSalaId);
        return ResponseEntity.ok(funciones);
    }
}