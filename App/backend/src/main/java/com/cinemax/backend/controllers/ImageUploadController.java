package com.cinemax.backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Collections;

// Controlador para manejar la subida de imágenes desde el panel de administración
@RestController
@RequestMapping("/api")
public class ImageUploadController {

    // Endpoint para subir una imagen. Guarda la imagen en static/assets y retorna
    // el nombre del archivo.
    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("No file selected");
        }
        try {
            // Directorio absoluto donde se guardarán las imágenes (frontend/assets)
            String uploadDir = "/home/odps/Documents/Cinemax/App/frontend/src/assets/";
            File dir = new File(uploadDir);
            if (!dir.exists()) {
                dir.mkdirs(); // Crea la carpeta si no existe
            }
            String filename = StringUtils.cleanPath(file.getOriginalFilename());
            File dest = new File(uploadDir + filename);
            file.transferTo(dest);
            // Retorna el nombre del archivo para que el frontend lo use
            return ResponseEntity.ok(Collections.singletonMap("filename", filename));
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error saving file: " + e.getMessage());
        }
    }
}
