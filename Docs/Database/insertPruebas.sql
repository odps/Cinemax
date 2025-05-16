-- Roles y permisos

insert into rol ( nombre_rol ) values ( 'ADMIN' );
insert into rol ( nombre_rol ) values ( 'CLIENT' );

insert into permiso ( nombre_permiso ) values ( 'ADMIN' );
insert into permiso ( nombre_permiso ) values ( 'CLIENT' );

insert into rol_permiso (
    id_rol,
    id_permiso
) values ( (
               select id_rol
               from rol
               where nombre_rol = 'ADMIN'
           ),
           (
               select id_permiso
               from permiso
               where nombre_permiso = 'ADMIN'
           ) );

insert into rol_permiso (
    id_rol,
    id_permiso
) values ( (
               select id_rol
               from rol
               where nombre_rol = 'CLIENT'
           ),
           (
               select id_permiso
               from permiso
               where nombre_permiso = 'CLIENT'
           ) );

commit;
/

-- Cines y Salas

insert into cine (
    nombre,
    direccion,
    ciudad,
    nif,
    telefono,
    descripcion,
    horario
) values ( 'Cine Madrid Centro',
           'Calle Gran Vía, 45',
           'Madrid',
           'B12345678',
           '910123456',
           'Cine moderno en el centro de Madrid con salas premium.',
           '10:00-23:00' );

insert into cine (
    nombre,
    direccion,
    ciudad,
    nif,
    telefono,
    descripcion,
    horario
) values ( 'Cine Barcelona Norte',
           'Avenida Diagonal, 123',
           'Barcelona',
           'B87654321',
           '930654321',
           'Cine con tecnología de última generación y cómodos asientos.',
           '11:00-22:30' );

insert into cine (
    nombre,
    direccion,
    ciudad,
    nif,
    telefono,
    descripcion,
    horario
) values ( 'Cine Sevilla Este',
           'Calle San Fernando, 12',
           'Sevilla',
           'B11223344',
           '954123987',
           'Cine familiar con una amplia variedad de películas y snacks.',
           '12:00-23:00' );

insert into cine (
    nombre,
    direccion,
    ciudad,
    nif,
    telefono,
    descripcion,
    horario
) values ( 'Cine Valencia Playa',
           'Paseo Marítimo, 5',
           'Valencia',
           'B22334455',
           '961789654',
           'Cine junto a la playa con vistas espectaculares y salas VIP.',
           '10:30-22:00' );

insert into cine (
    nombre,
    direccion,
    ciudad,
    nif,
    telefono,
    descripcion,
    horario
) values ( 'Cine Bilbao Centro',
           'Plaza Moyúa, 1',
           'Bilbao',
           'B33445566',
           '944567890',
           'Cine céntrico con proyecciones en 3D y 4D.',
           '11:00-23:30' );

commit;
/

-- Salas para Cine Madrid Centro
insert into sala (
    id_cine,
    nombre_sala,
    capacidad
) values ( (
               select id_cine
               from cine
               where nombre = 'Cine Madrid Centro'
           ),
           'Sala 1',
           30 );

insert into sala (
    id_cine,
    nombre_sala,
    capacidad
) values ( (
               select id_cine
               from cine
               where nombre = 'Cine Madrid Centro'
           ),
           'Sala 2',
           20 );

insert into sala (
    id_cine,
    nombre_sala,
    capacidad
) values ( (
               select id_cine
               from cine
               where nombre = 'Cine Madrid Centro'
           ),
           'Sala 3',
           15 );

-- Salas para Cine Barcelona Norte
insert into sala (
    id_cine,
    nombre_sala,
    capacidad
) values ( (
               select id_cine
               from cine
               where nombre = 'Cine Barcelona Norte'
           ),
           'Sala 1',
           25 );

insert into sala (
    id_cine,
    nombre_sala,
    capacidad
) values ( (
               select id_cine
               from cine
               where nombre = 'Cine Barcelona Norte'
           ),
           'Sala 2',
           20 );

-- Salas para Cine Sevilla Este
insert into sala (
    id_cine,
    nombre_sala,
    capacidad
) values ( (
               select id_cine
               from cine
               where nombre = 'Cine Sevilla Este'
           ),
           'Sala 1',
           25 );

insert into sala (
    id_cine,
    nombre_sala,
    capacidad
) values ( (
               select id_cine
               from cine
               where nombre = 'Cine Sevilla Este'
           ),
           'Sala 2',
           20 );

insert into sala (
    id_cine,
    nombre_sala,
    capacidad
) values ( (
               select id_cine
               from cine
               where nombre = 'Cine Sevilla Este'
           ),
           'Sala 3',
           20 );

-- Salas para Cine Valencia Playa
insert into sala (
    id_cine,
    nombre_sala,
    capacidad
) values ( (
               select id_cine
               from cine
               where nombre = 'Cine Valencia Playa'
           ),
           'Sala 1',
           15 );

insert into sala (
    id_cine,
    nombre_sala,
    capacidad
) values ( (
               select id_cine
               from cine
               where nombre = 'Cine Valencia Playa'
           ),
           'Sala 2',
           15 );

-- Salas para Cine Bilbao Centro
insert into sala (
    id_cine,
    nombre_sala,
    capacidad
) values ( (
               select id_cine
               from cine
               where nombre = 'Cine Bilbao Centro'
           ),
           'Sala 1',
           20 );

insert into sala (
    id_cine,
    nombre_sala,
    capacidad
) values ( (
               select id_cine
               from cine
               where nombre = 'Cine Bilbao Centro'
           ),
           'Sala 2',
           25 );

insert into sala (
    id_cine,
    nombre_sala,
    capacidad
) values ( (
               select id_cine
               from cine
               where nombre = 'Cine Bilbao Centro'
           ),
           'Sala 3',
           30 );

commit;
/

-- PELICULAS

insert into pelicula (
    titulo,
    genero,
    duracion,
    limite_edad,
    director,
    descripcion
) values ( 'El Caballero Oscuro',
           'Accion',
           152,
           'PEGI 13',
           'Christopher Nolan',
           'Batman enfrenta al Joker en una lucha épica por Gotham.' );

insert into pelicula (
    titulo,
    genero,
    duracion,
    limite_edad,
    director,
    descripcion
) values ( 'Titanic',
           'Romance',
           195,
           'PEGI 13',
           'James Cameron',
           'Una historia de amor trágica a bordo del famoso barco.' );

insert into pelicula (
    titulo,
    genero,
    duracion,
    limite_edad,
    director,
    descripcion
) values ( 'Avengers: Endgame',
           'Accion',
           181,
           'PEGI 13',
           'Anthony y Joe Russo',
           'Los Vengadores intentan revertir el daño causado por Thanos.' );

insert into pelicula (
    titulo,
    genero,
    duracion,
    limite_edad,
    director,
    descripcion
) values ( 'El Conjuro',
           'Horror',
           112,
           'PEGI 16',
           'James Wan',
           'Una pareja de investigadores paranormales enfrenta un caso aterrador.' );

insert into pelicula (
    titulo,
    genero,
    duracion,
    limite_edad,
    director,
    descripcion
) values ( 'La La Land',
           'Comedia',
           128,
           'PEGI 7',
           'Damien Chazelle',
           'Un músico y una actriz persiguen sus sueños en Los Ángeles.' );

insert into pelicula (
    titulo,
    genero,
    duracion,
    limite_edad,
    director,
    descripcion
) values ( 'Inception',
           'Ciencia Ficcion',
           148,
           'PEGI 13',
           'Christopher Nolan',
           'Un ladrón roba secretos a través de los sueños.' );

insert into pelicula (
    titulo,
    genero,
    duracion,
    limite_edad,
    director,
    descripcion
) values ( 'Jurassic Park',
           'Aventura',
           127,
           'PEGI 13',
           'Steven Spielberg',
           'Dinosaurios clonados causan caos en un parque temático.' );

insert into pelicula (
    titulo,
    genero,
    duracion,
    limite_edad,
    director,
    descripcion
) values ( 'El Señor de los Anillos: La Comunidad del Anillo',
           'Fantasia',
           178,
           'PEGI 13',
           'Peter Jackson',
           'Un grupo de héroes intenta destruir un anillo malvado.' );

insert into pelicula (
    titulo,
    genero,
    duracion,
    limite_edad,
    director,
    descripcion
) values ( 'Forrest Gump',
           'Drama',
           142,
           'PEGI 13',
           'Robert Zemeckis',
           'La vida extraordinaria de un hombre común.' );

insert into pelicula (
    titulo,
    genero,
    duracion,
    limite_edad,
    director,
    descripcion
) values ( 'Toy Story',
           'Comedia',
           81,
           'PEGI 7',
           'John Lasseter',
           'Un grupo de juguetes cobra vida cuando los humanos no están.' );

insert into pelicula (
    titulo,
    genero,
    duracion,
    limite_edad,
    director,
    descripcion
) values ( 'Matrix',
           'Ciencia Ficcion',
           136,
           'PEGI 16',
           'Lana y Lilly Wachowski',
           'Un hacker descubre la verdad sobre su realidad.' );

insert into pelicula (
    titulo,
    genero,
    duracion,
    limite_edad,
    director,
    descripcion
) values ( 'Gladiador',
           'Accion',
           155,
           'PEGI 16',
           'Ridley Scott',
           'Un general romano busca venganza como gladiador.' );

insert into pelicula (
    titulo,
    genero,
    duracion,
    limite_edad,
    director,
    descripcion
) values ( 'Coco',
           'Fantasia',
           105,
           'PEGI 7',
           'Lee Unkrich',
           'Un niño viaja al mundo de los muertos para descubrir su legado.' );

insert into pelicula (
    titulo,
    genero,
    duracion,
    limite_edad,
    director,
    descripcion
) values ( 'It',
           'Horror',
           135,
           'PEGI 16',
           'Andy Muschietti',
           'Un grupo de niños enfrenta a un payaso aterrador.' );

insert into pelicula (
    titulo,
    genero,
    duracion,
    limite_edad,
    director,
    descripcion
) values ( 'Frozen',
           'Fantasia',
           102,
           'PEGI 7',
           'Chris Buck y Jennifer Lee',
           'Dos hermanas enfrentan un invierno eterno.' );

insert into pelicula (
    titulo,
    genero,
    duracion,
    limite_edad,
    director,
    descripcion
) values ( 'Avatar',
           'Ciencia Ficcion',
           162,
           'PEGI 13',
           'James Cameron',
           'Un soldado se une a una raza alienígena en Pandora.' );

insert into pelicula (
    titulo,
    genero,
    duracion,
    limite_edad,
    director,
    descripcion
) values ( 'El Rey León',
           'Aventura',
           88,
           'PEGI 7',
           'Roger Allers y Rob Minkoff',
           'Un joven león lucha por reclamar su trono.' );

insert into pelicula (
    titulo,
    genero,
    duracion,
    limite_edad,
    director,
    descripcion
) values ( 'Shrek',
           'Comedia',
           90,
           'PEGI 7',
           'Andrew Adamson y Vicky Jenson',
           'Un ogro y un burro rescatan a una princesa.' );

insert into pelicula (
    titulo,
    genero,
    duracion,
    limite_edad,
    director,
    descripcion
) values ( 'Pulp Fiction',
           'Drama',
           154,
           'PEGI 18',
           'Quentin Tarantino',
           'Historias entrelazadas de crimen y redención.' );

insert into pelicula (
    titulo,
    genero,
    duracion,
    limite_edad,
    director,
    descripcion
) values ( 'Star Wars: Una Nueva Esperanza',
           'Ciencia Ficcion',
           121,
           'PEGI 7',
           'George Lucas',
           'Un joven granjero se une a la lucha contra el Imperio.' );

commit;
/

-- FUNCIONES

-- Funciones para las salas de Cine Madrid Centro
insert into funcion (
    id_pelicula,
    id_sala,
    fecha_hora,
    precio
) values ( (
               select id_pelicula
               from pelicula
               where titulo = 'El Caballero Oscuro'
           ),
           (
               select id_sala
               from sala
               where nombre_sala = 'Sala 1'
                 and id_cine = (
                   select id_cine
                   from cine
                   where nombre = 'Cine Madrid Centro'
               )
           ),
           to_timestamp('2023-12-01 18:00:00',
                        'YYYY-MM-DD HH24:MI:SS'),
           8.50 );

insert into funcion (
    id_pelicula,
    id_sala,
    fecha_hora,
    precio
) values ( (
               select id_pelicula
               from pelicula
               where titulo = 'Titanic'
           ),
           (
               select id_sala
               from sala
               where nombre_sala = 'Sala 1'
                 and id_cine = (
                   select id_cine
                   from cine
                   where nombre = 'Cine Madrid Centro'
               )
           ),
           to_timestamp('2023-12-01 21:00:00',
                        'YYYY-MM-DD HH24:MI:SS'),
           9.00 );

insert into funcion (
    id_pelicula,
    id_sala,
    fecha_hora,
    precio
) values ( (
               select id_pelicula
               from pelicula
               where titulo = 'Inception'
           ),
           (
               select id_sala
               from sala
               where nombre_sala = 'Sala 2'
                 and id_cine = (
                   select id_cine
                   from cine
                   where nombre = 'Cine Madrid Centro'
               )
           ),
           to_timestamp('2023-12-01 19:00:00',
                        'YYYY-MM-DD HH24:MI:SS'),
           10.00 );

insert into funcion (
    id_pelicula,
    id_sala,
    fecha_hora,
    precio
) values ( (
               select id_pelicula
               from pelicula
               where titulo = 'La La Land'
           ),
           (
               select id_sala
               from sala
               where nombre_sala = 'Sala 2'
                 and id_cine = (
                   select id_cine
                   from cine
                   where nombre = 'Cine Madrid Centro'
               )
           ),
           to_timestamp('2023-12-01 22:00:00',
                        'YYYY-MM-DD HH24:MI:SS'),
           8.00 );

-- Funciones para las salas de Cine Barcelona Norte
insert into funcion (
    id_pelicula,
    id_sala,
    fecha_hora,
    precio
) values ( (
               select id_pelicula
               from pelicula
               where titulo = 'Jurassic Park'
           ),
           (
               select id_sala
               from sala
               where nombre_sala = 'Sala 1'
                 and id_cine = (
                   select id_cine
                   from cine
                   where nombre = 'Cine Barcelona Norte'
               )
           ),
           to_timestamp('2023-12-02 17:00:00',
                        'YYYY-MM-DD HH24:MI:SS'),
           7.50 );

insert into funcion (
    id_pelicula,
    id_sala,
    fecha_hora,
    precio
) values ( (
               select id_pelicula
               from pelicula
               where titulo = 'Matrix'
           ),
           (
               select id_sala
               from sala
               where nombre_sala = 'Sala 1'
                 and id_cine = (
                   select id_cine
                   from cine
                   where nombre = 'Cine Barcelona Norte'
               )
           ),
           to_timestamp('2023-12-02 20:00:00',
                        'YYYY-MM-DD HH24:MI:SS'),
           9.50 );

insert into funcion (
    id_pelicula,
    id_sala,
    fecha_hora,
    precio
) values ( (
               select id_pelicula
               from pelicula
               where titulo = 'Coco'
           ),
           (
               select id_sala
               from sala
               where nombre_sala = 'Sala 2'
                 and id_cine = (
                   select id_cine
                   from cine
                   where nombre = 'Cine Barcelona Norte'
               )
           ),
           to_timestamp('2023-12-02 18:00:00',
                        'YYYY-MM-DD HH24:MI:SS'),
           6.50 );

insert into funcion (
    id_pelicula,
    id_sala,
    fecha_hora,
    precio
) values ( (
               select id_pelicula
               from pelicula
               where titulo = 'Frozen'
           ),
           (
               select id_sala
               from sala
               where nombre_sala = 'Sala 2'
                 and id_cine = (
                   select id_cine
                   from cine
                   where nombre = 'Cine Barcelona Norte'
               )
           ),
           to_timestamp('2023-12-02 21:00:00',
                        'YYYY-MM-DD HH24:MI:SS'),
           7.00 );

-- Cine Madrid Centro - Sala 3
insert into funcion (
    id_pelicula,
    id_sala,
    fecha_hora,
    precio
) values ( (
               select id_pelicula
               from pelicula
               where titulo = 'Forrest Gump'
           ),
           (
               select id_sala
               from sala
               where nombre_sala = 'Sala 3'
                 and id_cine = (
                   select id_cine
                   from cine
                   where nombre = 'Cine Madrid Centro'
               )
           ),
           to_timestamp('2023-12-01 17:00:00',
                        'YYYY-MM-DD HH24:MI:SS'),
           7.50 );

insert into funcion (
    id_pelicula,
    id_sala,
    fecha_hora,
    precio
) values ( (
               select id_pelicula
               from pelicula
               where titulo = 'Shrek'
           ),
           (
               select id_sala
               from sala
               where nombre_sala = 'Sala 3'
                 and id_cine = (
                   select id_cine
                   from cine
                   where nombre = 'Cine Madrid Centro'
               )
           ),
           to_timestamp('2023-12-01 20:00:00',
                        'YYYY-MM-DD HH24:MI:SS'),
           8.00 );

-- Cine Barcelona Norte - Sala 2
insert into funcion (
    id_pelicula,
    id_sala,
    fecha_hora,
    precio
) values ( (
               select id_pelicula
               from pelicula
               where titulo = 'El Señor de los Anillos: La Comunidad del Anillo'
           ),
           (
               select id_sala
               from sala
               where nombre_sala = 'Sala 2'
                 and id_cine = (
                   select id_cine
                   from cine
                   where nombre = 'Cine Barcelona Norte'
               )
           ),
           to_timestamp('2023-12-02 16:00:00',
                        'YYYY-MM-DD HH24:MI:SS'),
           8.50 );

insert into funcion (
    id_pelicula,
    id_sala,
    fecha_hora,
    precio
) values ( (
               select id_pelicula
               from pelicula
               where titulo = 'Avatar'
           ),
           (
               select id_sala
               from sala
               where nombre_sala = 'Sala 2'
                 and id_cine = (
                   select id_cine
                   from cine
                   where nombre = 'Cine Barcelona Norte'
               )
           ),
           to_timestamp('2023-12-02 19:30:00',
                        'YYYY-MM-DD HH24:MI:SS'),
           9.00 );

-- Cine Sevilla Este - Sala 1
insert into funcion (
    id_pelicula,
    id_sala,
    fecha_hora,
    precio
) values ( (
               select id_pelicula
               from pelicula
               where titulo = 'El Conjuro'
           ),
           (
               select id_sala
               from sala
               where nombre_sala = 'Sala 1'
                 and id_cine = (
                   select id_cine
                   from cine
                   where nombre = 'Cine Sevilla Este'
               )
           ),
           to_timestamp('2023-12-03 18:00:00',
                        'YYYY-MM-DD HH24:MI:SS'),
           7.00 );

insert into funcion (
    id_pelicula,
    id_sala,
    fecha_hora,
    precio
) values ( (
               select id_pelicula
               from pelicula
               where titulo = 'It'
           ),
           (
               select id_sala
               from sala
               where nombre_sala = 'Sala 1'
                 and id_cine = (
                   select id_cine
                   from cine
                   where nombre = 'Cine Sevilla Este'
               )
           ),
           to_timestamp('2023-12-03 21:00:00',
                        'YYYY-MM-DD HH24:MI:SS'),
           7.50 );

-- Cine Sevilla Este - Sala 2
insert into funcion (
    id_pelicula,
    id_sala,
    fecha_hora,
    precio
) values ( (
               select id_pelicula
               from pelicula
               where titulo = 'Toy Story'
           ),
           (
               select id_sala
               from sala
               where nombre_sala = 'Sala 2'
                 and id_cine = (
                   select id_cine
                   from cine
                   where nombre = 'Cine Sevilla Este'
               )
           ),
           to_timestamp('2023-12-03 17:00:00',
                        'YYYY-MM-DD HH24:MI:SS'),
           6.00 );

insert into funcion (
    id_pelicula,
    id_sala,
    fecha_hora,
    precio
) values ( (
               select id_pelicula
               from pelicula
               where titulo = 'El Rey León'
           ),
           (
               select id_sala
               from sala
               where nombre_sala = 'Sala 2'
                 and id_cine = (
                   select id_cine
                   from cine
                   where nombre = 'Cine Sevilla Este'
               )
           ),
           to_timestamp('2023-12-03 20:00:00',
                        'YYYY-MM-DD HH24:MI:SS'),
           6.50 );

-- Cine Sevilla Este - Sala 3
insert into funcion (
    id_pelicula,
    id_sala,
    fecha_hora,
    precio
) values ( (
               select id_pelicula
               from pelicula
               where titulo = 'Pulp Fiction'
           ),
           (
               select id_sala
               from sala
               where nombre_sala = 'Sala 3'
                 and id_cine = (
                   select id_cine
                   from cine
                   where nombre = 'Cine Sevilla Este'
               )
           ),
           to_timestamp('2023-12-03 19:00:00',
                        'YYYY-MM-DD HH24:MI:SS'),
           8.00 );

insert into funcion (
    id_pelicula,
    id_sala,
    fecha_hora,
    precio
) values ( (
               select id_pelicula
               from pelicula
               where titulo = 'Gladiador'
           ),
           (
               select id_sala
               from sala
               where nombre_sala = 'Sala 3'
                 and id_cine = (
                   select id_cine
                   from cine
                   where nombre = 'Cine Sevilla Este'
               )
           ),
           to_timestamp('2023-12-03 22:00:00',
                        'YYYY-MM-DD HH24:MI:SS'),
           8.50 );

-- Cine Valencia Playa - Sala 1
insert into funcion (
    id_pelicula,
    id_sala,
    fecha_hora,
    precio
) values ( (
               select id_pelicula
               from pelicula
               where titulo = 'Star Wars: Una Nueva Esperanza'
           ),
           (
               select id_sala
               from sala
               where nombre_sala = 'Sala 1'
                 and id_cine = (
                   select id_cine
                   from cine
                   where nombre = 'Cine Valencia Playa'
               )
           ),
           to_timestamp('2023-12-04 18:00:00',
                        'YYYY-MM-DD HH24:MI:SS'),
           8.00 );

insert into funcion (
    id_pelicula,
    id_sala,
    fecha_hora,
    precio
) values ( (
               select id_pelicula
               from pelicula
               where titulo = 'Frozen'
           ),
           (
               select id_sala
               from sala
               where nombre_sala = 'Sala 1'
                 and id_cine = (
                   select id_cine
                   from cine
                   where nombre = 'Cine Valencia Playa'
               )
           ),
           to_timestamp('2023-12-04 21:00:00',
                        'YYYY-MM-DD HH24:MI:SS'),
           7.50 );

-- Cine Valencia Playa - Sala 2
insert into funcion (
    id_pelicula,
    id_sala,
    fecha_hora,
    precio
) values ( (
               select id_pelicula
               from pelicula
               where titulo = 'La La Land'
           ),
           (
               select id_sala
               from sala
               where nombre_sala = 'Sala 2'
                 and id_cine = (
                   select id_cine
                   from cine
                   where nombre = 'Cine Valencia Playa'
               )
           ),
           to_timestamp('2023-12-04 17:30:00',
                        'YYYY-MM-DD HH24:MI:SS'),
           7.00 );

insert into funcion (
    id_pelicula,
    id_sala,
    fecha_hora,
    precio
) values ( (
               select id_pelicula
               from pelicula
               where titulo = 'Coco'
           ),
           (
               select id_sala
               from sala
               where nombre_sala = 'Sala 2'
                 and id_cine = (
                   select id_cine
                   from cine
                   where nombre = 'Cine Valencia Playa'
               )
           ),
           to_timestamp('2023-12-04 20:30:00',
                        'YYYY-MM-DD HH24:MI:SS'),
           7.50 );

-- Cine Bilbao Centro - Sala 1
insert into funcion (
    id_pelicula,
    id_sala,
    fecha_hora,
    precio
) values ( (
               select id_pelicula
               from pelicula
               where titulo = 'Jurassic Park'
           ),
           (
               select id_sala
               from sala
               where nombre_sala = 'Sala 1'
                 and id_cine = (
                   select id_cine
                   from cine
                   where nombre = 'Cine Bilbao Centro'
               )
           ),
           to_timestamp('2023-12-05 18:00:00',
                        'YYYY-MM-DD HH24:MI:SS'),
           8.50 );

insert into funcion (
    id_pelicula,
    id_sala,
    fecha_hora,
    precio
) values ( (
               select id_pelicula
               from pelicula
               where titulo = 'Inception'
           ),
           (
               select id_sala
               from sala
               where nombre_sala = 'Sala 1'
                 and id_cine = (
                   select id_cine
                   from cine
                   where nombre = 'Cine Bilbao Centro'
               )
           ),
           to_timestamp('2023-12-05 21:00:00',
                        'YYYY-MM-DD HH24:MI:SS'),
           9.00 );

-- Cine Bilbao Centro - Sala 2
insert into funcion (
    id_pelicula,
    id_sala,
    fecha_hora,
    precio
) values ( (
               select id_pelicula
               from pelicula
               where titulo = 'Matrix'
           ),
           (
               select id_sala
               from sala
               where nombre_sala = 'Sala 2'
                 and id_cine = (
                   select id_cine
                   from cine
                   where nombre = 'Cine Bilbao Centro'
               )
           ),
           to_timestamp('2023-12-05 19:00:00',
                        'YYYY-MM-DD HH24:MI:SS'),
           9.50 );

insert into funcion (
    id_pelicula,
    id_sala,
    fecha_hora,
    precio
) values ( (
               select id_pelicula
               from pelicula
               where titulo = 'El Caballero Oscuro'
           ),
           (
               select id_sala
               from sala
               where nombre_sala = 'Sala 2'
                 and id_cine = (
                   select id_cine
                   from cine
                   where nombre = 'Cine Bilbao Centro'
               )
           ),
           to_timestamp('2023-12-05 22:00:00',
                        'YYYY-MM-DD HH24:MI:SS'),
           10.00 );

-- Cine Bilbao Centro - Sala 3
insert into funcion (
    id_pelicula,
    id_sala,
    fecha_hora,
    precio
) values ( (
               select id_pelicula
               from pelicula
               where titulo = 'Titanic'
           ),
           (
               select id_sala
               from sala
               where nombre_sala = 'Sala 3'
                 and id_cine = (
                   select id_cine
                   from cine
                   where nombre = 'Cine Bilbao Centro'
               )
           ),
           to_timestamp('2023-12-05 18:30:00',
                        'YYYY-MM-DD HH24:MI:SS'),
           8.00 );

insert into funcion (
    id_pelicula,
    id_sala,
    fecha_hora,
    precio
) values ( (
               select id_pelicula
               from pelicula
               where titulo = 'Avatar'
           ),
           (
               select id_sala
               from sala
               where nombre_sala = 'Sala 3'
                 and id_cine = (
                   select id_cine
                   from cine
                   where nombre = 'Cine Bilbao Centro'
               )
           ),
           to_timestamp('2023-12-05 21:30:00',
                        'YYYY-MM-DD HH24:MI:SS'),
           9.00 );

commit;
/

-- PROMOCIONES

insert into promocion (
    titulo,
    descripcion,
    tipo,
    fecha_inicio,
    fecha_fin
) values ( 'Descuento Otoño',
           '10% de descuento en todas las funciones de octubre.',
           'descuento',
           to_date('2025-10-01','YYYY-MM-DD'),
           to_date('2025-10-31','YYYY-MM-DD') );

insert into promocion (
    titulo,
    descripcion,
    tipo,
    fecha_inicio,
    fecha_fin
) values ( 'Combo Amigos',
           '4 entradas + 2 combos de palomitas y refresco.',
           'combo',
           to_date('2025-08-01','YYYY-MM-DD'),
           to_date('2025-09-30','YYYY-MM-DD') );

insert into promocion (
    titulo,
    descripcion,
    tipo,
    fecha_inicio,
    fecha_fin
) values ( '2x1 Jueves',
           '2x1 en entradas todos los jueves.',
           '2x1',
           to_date('2025-07-10','YYYY-MM-DD'),
           to_date('2025-12-18','YYYY-MM-DD') );

insert into promocion (
    titulo,
    descripcion,
    tipo,
    fecha_inicio,
    fecha_fin
) values ( 'Premium Experience',
           'Acceso a sala premium con asientos reclinables y menú gourmet.',
           'premium',
           to_date('2025-09-01','YYYY-MM-DD'),
           to_date('2025-12-31','YYYY-MM-DD') );

insert into promocion (
    titulo,
    descripcion,
    tipo,
    fecha_inicio,
    fecha_fin
) values ( 'Sorpresa Cine',
           'Promoción especial sorpresa solo para clientes frecuentes.',
           'otro',
           to_date('2025-11-01','YYYY-MM-DD'),
           to_date('2025-11-30','YYYY-MM-DD') );

commit;
/

-- ASOCIAR CINES CON PROMOCIONES

-- Cine Madrid Centro: Descuento Otoño, Combo Amigos
insert into cine_promocion (
    id_cine,
    id_promocion
) values ( (
               select id_cine
               from cine
               where nombre = 'Cine Madrid Centro'
           ),
           (
               select id_promocion
               from promocion
               where titulo = 'Descuento Otoño'
           ) );
insert into cine_promocion (
    id_cine,
    id_promocion
) values ( (
               select id_cine
               from cine
               where nombre = 'Cine Madrid Centro'
           ),
           (
               select id_promocion
               from promocion
               where titulo = 'Combo Amigos'
           ) );

-- Cine Barcelona Norte: 2x1 Jueves, Premium Experience
insert into cine_promocion (
    id_cine,
    id_promocion
) values ( (
               select id_cine
               from cine
               where nombre = 'Cine Barcelona Norte'
           ),
           (
               select id_promocion
               from promocion
               where titulo = '2x1 Jueves'
           ) );
insert into cine_promocion (
    id_cine,
    id_promocion
) values ( (
               select id_cine
               from cine
               where nombre = 'Cine Barcelona Norte'
           ),
           (
               select id_promocion
               from promocion
               where titulo = 'Premium Experience'
           ) );

-- Cine Sevilla Este: Sorpresa Cine, Combo Amigos
insert into cine_promocion (
    id_cine,
    id_promocion
) values ( (
               select id_cine
               from cine
               where nombre = 'Cine Sevilla Este'
           ),
           (
               select id_promocion
               from promocion
               where titulo = 'Sorpresa Cine'
           ) );
insert into cine_promocion (
    id_cine,
    id_promocion
) values ( (
               select id_cine
               from cine
               where nombre = 'Cine Sevilla Este'
           ),
           (
               select id_promocion
               from promocion
               where titulo = 'Combo Amigos'
           ) );

-- Cine Valencia Playa: Descuento Otoño, Premium Experience
insert into cine_promocion (
    id_cine,
    id_promocion
) values ( (
               select id_cine
               from cine
               where nombre = 'Cine Valencia Playa'
           ),
           (
               select id_promocion
               from promocion
               where titulo = 'Descuento Otoño'
           ) );
insert into cine_promocion (
    id_cine,
    id_promocion
) values ( (
               select id_cine
               from cine
               where nombre = 'Cine Valencia Playa'
           ),
           (
               select id_promocion
               from promocion
               where titulo = 'Premium Experience'
           ) );

-- Cine Bilbao Centro: 2x1 Jueves, Sorpresa Cine
insert into cine_promocion (
    id_cine,
    id_promocion
) values ( (
               select id_cine
               from cine
               where nombre = 'Cine Bilbao Centro'
           ),
           (
               select id_promocion
               from promocion
               where titulo = '2x1 Jueves'
           ) );
insert into cine_promocion (
    id_cine,
    id_promocion
) values ( (
               select id_cine
               from cine
               where nombre = 'Cine Bilbao Centro'
           ),
           (
               select id_promocion
               from promocion
               where titulo = 'Sorpresa Cine'
           ) );

commit;
/

insert into usuario (
    nombre,
    correo,
    contraseña,
    fecha_registro,
    id_rol
) values ( 'Ana García',
           'ana.garcia@email.com',
           'password123',
           SYSDATE,
           2);

insert into usuario (
    nombre,
    correo,
    contraseña,
    fecha_registro,
    id_rol
) values ( 'Luis Pérez',
           'luis.perez@email.com',
           'password456',
           SYSDATE,
           2);

insert into usuario (
    nombre,
    correo,
    contraseña,
    fecha_registro,
    id_rol
) values ( 'Marta López',
           'marta.lopez@email.com',
           'password789',
           SYSDATE,
           2);

insert into usuario (
    nombre,
    correo,
    contraseña,
    fecha_registro,
    id_rol
) values ( 'Carlos Ruiz',
           'carlos.ruiz@email.com',
           'passwordabc',
           SYSDATE,
           2);

insert into usuario (
    nombre,
    correo,
    contraseña,
    fecha_registro,
    id_rol
) values ( 'Elena Torres',
           'elena.torres@email.com',
           'passworddef',
           SYSDATE,
           2);

insert into usuario (
    nombre,
    correo,
    contraseña,
    fecha_registro,
    id_rol
) values ( 'Javier Fernández',
           'javier.fernandez@email.com',
           'passwordghi',
           SYSDATE,
           2);

insert into usuario (
    nombre,
    correo,
    contraseña,
    fecha_registro,
    id_rol
) values ( 'Lucía Martínez',
           'lucia.martinez@email.com',
           'passwordjkl',
           SYSDATE,
           2);

insert into usuario (
    nombre,
    correo,
    contraseña,
    fecha_registro,
    id_rol
) values ( 'Sergio Gómez',
           'sergio.gomez@email.com',
           'passwordmno',
           SYSDATE,
           2);

insert into usuario (
    nombre,
    correo,
    contraseña,
    fecha_registro,
    id_rol
) values ( 'Paula Sánchez',
           'paula.sanchez@email.com',
           'passwordpqr',
           SYSDATE,
           2);

insert into usuario (
    nombre,
    correo,
    contraseña,
    fecha_registro,
    id_rol
) values ( 'Raúl Díaz',
           'raul.diaz@email.com',
           'passwordstu',
           SYSDATE,
           2);

commit;
/

-- RESEÑAS DE USUARIOS DE PRUEBA

insert into review (
    id_usuario,
    id_cine,
    puntuacion,
    comentario,
    fecha_review
) values ( (
               select id_usuario
               from usuario
               where correo = 'ana.garcia@email.com'
           ),
           (
               select id_cine
               from cine
               where nombre = 'Cine Madrid Centro'
           ),
           5,
           'Excelente experiencia, muy recomendable.',
           SYSDATE );

insert into review (
    id_usuario,
    id_cine,
    puntuacion,
    comentario,
    fecha_review
) values ( (
               select id_usuario
               from usuario
               where correo = 'luis.perez@email.com'
           ),
           (
               select id_cine
               from cine
               where nombre = 'Cine Barcelona Norte'
           ),
           4,
           'Muy buen cine, aunque las palomitas podrían mejorar.',
           SYSDATE );

insert into review (
    id_usuario,
    id_cine,
    puntuacion,
    comentario,
    fecha_review
) values ( (
               select id_usuario
               from usuario
               where correo = 'marta.lopez@email.com'
           ),
           (
               select id_cine
               from cine
               where nombre = 'Cine Sevilla Este'
           ),
           3,
           'Buena atención pero la sala estaba algo fría.',
           SYSDATE );

insert into review (
    id_usuario,
    id_cine,
    puntuacion,
    comentario,
    fecha_review
) values ( (
               select id_usuario
               from usuario
               where correo = 'carlos.ruiz@email.com'
           ),
           (
               select id_cine
               from cine
               where nombre = 'Cine Valencia Playa'
           ),
           5,
           '¡Vistas increíbles y asientos cómodos!',
           SYSDATE );

insert into review (
    id_usuario,
    id_cine,
    puntuacion,
    comentario,
    fecha_review
) values ( (
               select id_usuario
               from usuario
               where correo = 'elena.torres@email.com'
           ),
           (
               select id_cine
               from cine
               where nombre = 'Cine Bilbao Centro'
           ),
           2,
           'Demasiado ruido durante la función.',
           SYSDATE );

insert into review (
    id_usuario,
    id_cine,
    puntuacion,
    comentario,
    fecha_review
) values ( (
               select id_usuario
               from usuario
               where correo = 'javier.fernandez@email.com'
           ),
           (
               select id_cine
               from cine
               where nombre = 'Cine Madrid Centro'
           ),
           4,
           'Salas limpias y personal amable.',
           SYSDATE );

insert into review (
    id_usuario,
    id_cine,
    puntuacion,
    comentario,
    fecha_review
) values ( (
               select id_usuario
               from usuario
               where correo = 'lucia.martinez@email.com'
           ),
           (
               select id_cine
               from cine
               where nombre = 'Cine Barcelona Norte'
           ),
           3,
           'Buena calidad de imagen, pero caro.',
           SYSDATE );

insert into review (
    id_usuario,
    id_cine,
    puntuacion,
    comentario,
    fecha_review
) values ( (
               select id_usuario
               from usuario
               where correo = 'sergio.gomez@email.com'
           ),
           (
               select id_cine
               from cine
               where nombre = 'Cine Sevilla Este'
           ),
           1,
           'No me gustó la atención en la taquilla.',
           SYSDATE );

insert into review (
    id_usuario,
    id_cine,
    puntuacion,
    comentario,
    fecha_review
) values ( (
               select id_usuario
               from usuario
               where correo = 'paula.sanchez@email.com'
           ),
           (
               select id_cine
               from cine
               where nombre = 'Cine Valencia Playa'
           ),
           5,
           'Perfecto para ir en familia.',
           SYSDATE );

insert into review (
    id_usuario,
    id_cine,
    puntuacion,
    comentario,
    fecha_review
) values ( (
               select id_usuario
               from usuario
               where correo = 'raul.diaz@email.com'
           ),
           (
               select id_cine
               from cine
               where nombre = 'Cine Bilbao Centro'
           ),
           4,
           'Me encantó la proyección en 3D.',
           SYSDATE );

commit;
