 
-- Tabla Usuario
CREATE TABLE Usuario (
    id_usuario NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR2(100) NOT NULL,
    correo VARCHAR2(100) UNIQUE NOT NULL,
    contraseña VARCHAR2(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT SYSTIMESTAMP NOT NULL
);

-- Tabla Rol
CREATE TABLE Rol (
    id_rol NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre_rol VARCHAR2(50) NOT NULL
);

-- Tabla Permiso
CREATE TABLE Permiso (
    id_permiso NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre_permiso VARCHAR2(100) NOT NULL
);

-- Tabla Rol_Permiso
CREATE TABLE Rol_Permiso (
    id_rol NUMBER NOT NULL,
    id_permiso NUMBER NOT NULL,
    PRIMARY KEY (id_rol, id_permiso),
    FOREIGN KEY (id_rol) REFERENCES Rol(id_rol),
    FOREIGN KEY (id_permiso) REFERENCES Permiso(id_permiso)
);

-- Tabla Cine
CREATE TABLE Cine (
    id_cine NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR2(100) NOT NULL,
    direccion VARCHAR2(200) NOT NULL,
    ciudad VARCHAR2(100) NOT NULL,
    NIF VARCHAR2(20) UNIQUE NOT NULL,
    imagenurl VARCHAR2(100)
);

-- Tabla Review
CREATE TABLE Review (
    id_review NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_usuario NUMBER NOT NULL,
    id_cine NUMBER NOT NULL,
    puntuacion NUMBER(1) CHECK (puntuacion BETWEEN 1 AND 5) NOT NULL,
    comentario VARCHAR2(255),
    fecha_review TIMESTAMP DEFAULT SYSTIMESTAMP NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
    FOREIGN KEY (id_cine) REFERENCES Cine(id_cine)
);

-- Tabla Sala
CREATE TABLE Sala (
    id_sala NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_cine NUMBER NOT NULL,
    nombre_sala VARCHAR2(50) NOT NULL,
    capacidad NUMBER NOT NULL CHECK (capacidad > 0),
    FOREIGN KEY (id_cine) REFERENCES Cine(id_cine)
);

-- Tabla Asiento
CREATE TABLE Asiento (
    id_asiento NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_sala NUMBER NOT NULL,
    fila VARCHAR2(2) NOT NULL,
    numero NUMBER NOT NULL,
    FOREIGN KEY (id_sala) REFERENCES Sala(id_sala),
    CONSTRAINT unique_asiento_sala UNIQUE (id_sala, fila, numero)
);

-- Tabla Película
CREATE TABLE Pelicula (
    id_pelicula NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    titulo VARCHAR2(200) NOT NULL,
    genero VARCHAR2(50) NOT NULL,
    duracion NUMBER NOT NULL CHECK (duracion > 0),
    limite_edad VARCHAR2(10),
    director VARCHAR2(100),
    descripcion CLOB,
    imagenurl VARCHAR2(100)
);

-- Tabla Función
CREATE TABLE Funcion (
    id_funcion NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_pelicula NUMBER NOT NULL,
    id_sala NUMBER NOT NULL,
    fecha_hora TIMESTAMP NOT NULL,
    precio NUMBER(10,2) NOT NULL CHECK (precio >= 0),
    FOREIGN KEY (id_pelicula) REFERENCES Pelicula(id_pelicula),
    FOREIGN KEY (id_sala) REFERENCES Sala(id_sala)
);

-- Tabla Disponibilidad_Asiento
CREATE TABLE Disponibilidad_Asiento (
    id_disponibilidad NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_asiento NUMBER NOT NULL,
    id_funcion NUMBER NOT NULL,
    estado VARCHAR2(20) NOT NULL CHECK (estado IN ('disponible', 'reservado', 'ocupado')),
    bloqueado_hasta TIMESTAMP,
    FOREIGN KEY (id_asiento) REFERENCES Asiento(id_asiento),
    FOREIGN KEY (id_funcion) REFERENCES Funcion(id_funcion),
    CONSTRAINT unique_asiento_funcion UNIQUE (id_asiento, id_funcion)
);

-- Tabla Ticket
CREATE TABLE Ticket (
    id_ticket NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_usuario NUMBER NOT NULL,
    id_funcion NUMBER NOT NULL,
    id_asiento NUMBER NOT NULL,
    fecha_compra TIMESTAMP DEFAULT SYSTIMESTAMP NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
    FOREIGN KEY (id_funcion) REFERENCES Funcion(id_funcion),
    FOREIGN KEY (id_asiento) REFERENCES Asiento(id_asiento)
);

-- Tabla Factura
CREATE TABLE Factura (
    id_factura NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_ticket NUMBER NOT NULL,
    id_usuario NUMBER NOT NULL,
    fecha_emision TIMESTAMP DEFAULT SYSTIMESTAMP NOT NULL,
    monto_total NUMBER(10,2) NOT NULL CHECK (monto_total >= 0),
    metodo_pago VARCHAR2(50) NOT NULL,
    estado VARCHAR2(20) NOT NULL CHECK (estado IN ('pagada', 'cancelada')),
    FOREIGN KEY (id_ticket) REFERENCES Ticket(id_ticket),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

-- Tabla Log
CREATE TABLE Log (
    id_log NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_usuario NUMBER NOT NULL,
    accion VARCHAR2(200) NOT NULL,
    fecha_accion TIMESTAMP DEFAULT SYSTIMESTAMP NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);
