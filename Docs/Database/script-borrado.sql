-- Tablas de log y auditoría
DROP TABLE Log CASCADE CONSTRAINTS;
DROP TABLE Factura CASCADE CONSTRAINTS;

-- Tablas de transacciones
DROP TABLE Ticket CASCADE CONSTRAINTS;
DROP TABLE Disponibilidad_Asiento CASCADE CONSTRAINTS;

-- Tablas de funciones y programación
DROP TABLE Funcion CASCADE CONSTRAINTS;
DROP TABLE Pelicula CASCADE CONSTRAINTS;

-- Tablas de estructura del cine
DROP TABLE Asiento CASCADE CONSTRAINTS;
DROP TABLE Sala CASCADE CONSTRAINTS;
DROP TABLE Review CASCADE CONSTRAINTS;
DROP TABLE Cine_Promocion CASCADE CONSTRAINTS;
DROP TABLE Promocion CASCADE CONSTRAINTS;
DROP TABLE Cine CASCADE CONSTRAINTS;

-- Tablas de seguridad y usuarios
DROP TABLE Rol_Permiso CASCADE CONSTRAINTS;
DROP TABLE Permiso CASCADE CONSTRAINTS;
DROP TABLE Rol CASCADE CONSTRAINTS;
DROP TABLE Usuario CASCADE CONSTRAINTS;
