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

    // Sube una imagen al servidor y retorna el nombre del archivo guardado
    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("No se seleccionó ningún archivo");
        }
        try {
            // Ruta absoluta donde se guardan las imágenes cargadas
            String uploadDir = "/home/odps/Documents/Cinemax/App/frontend/src/assets/";
            File dir = new File(uploadDir);
            if (!dir.exists()) {
                dir.mkdirs(); // Crea la carpeta si no existe
            }
            String filename = StringUtils.cleanPath(file.getOriginalFilename());
            File dest = new File(uploadDir + filename);
            if (dest.exists()) {
                return ResponseEntity.status(409).body("El archivo ya existe");
            }
            file.transferTo(dest); // Guarda el archivo en el sistema de archivos
            return ResponseEntity.ok(Collections.singletonMap("filename", filename));
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error al guardar el archivo: " + e.getMessage());
        }
    }
}
