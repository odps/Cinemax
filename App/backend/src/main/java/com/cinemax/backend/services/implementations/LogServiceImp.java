package com.cinemax.backend.services.implementations;

import com.cinemax.backend.models.Log;
import com.cinemax.backend.models.Usuario;
import com.cinemax.backend.repositories.LogRepo;
import com.cinemax.backend.repositories.UsuarioRepo;
import com.cinemax.backend.services.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LogServiceImp implements LogService {

    @Autowired
    private LogRepo logRepo;

    @Autowired
    private UsuarioRepo usuarioRepo;

    @Override
    public ResponseEntity<?> getLogs() {
        List<Log> logs = logRepo.findAll();
        if (logs.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(logs);
    }

    @Override
    public ResponseEntity<?> getLog(long id) {
        Log log = logRepo.findById(id).orElse(null);
        if (log == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(log);
    }

    @Override
    public ResponseEntity<?> createLog(Log log) {
        // Validación de datos obligatorios y existencia de usuario
        if (log.getUsuario() == null || log.getAccion() == null || log.getAccion().isEmpty()) {
            return ResponseEntity.badRequest().body("Datos de log inválidos");
        }
        Usuario usuario = usuarioRepo.findById(log.getUsuario().getId()).orElse(null);
        if (usuario == null) {
            return ResponseEntity.badRequest().body("Usuario no encontrado");
        }
        log.setUsuario(usuario);
        logRepo.save(log);
        return ResponseEntity.ok(log);
    }

    @Override
    public ResponseEntity<?> updateLog(Log log, long id) {
        Log logOld = logRepo.findById(id).orElse(null);
        if (logOld == null) {
            return ResponseEntity.badRequest().body("Log no encontrado");
        }
        // Solo se actualiza la acción si se proporciona un valor válido
        if (log.getAccion() != null && !log.getAccion().isEmpty()) {
            logOld.setAccion(log.getAccion());
        }
        logRepo.save(logOld);
        return ResponseEntity.ok(logOld);
    }

    @Override
    public ResponseEntity<?> deleteLog(long id) {
        if (logRepo.existsById(id)) {
            logRepo.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @Override
    public ResponseEntity<?> getLogsByUsuarioId(long usuarioId) {
        // Se valida la existencia del usuario antes de buscar sus logs
        if (!usuarioRepo.existsById(usuarioId)) {
            return ResponseEntity.badRequest().body("Usuario no encontrado");
        }
        List<Log> logs = logRepo.findByUsuarioId(usuarioId);
        if (logs.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(logs);
    }

    @Override
    public ResponseEntity<?> getLogsByAccion(String accion) {
        List<Log> logs = logRepo.findByAccion(accion);
        if (logs.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(logs);
    }
}