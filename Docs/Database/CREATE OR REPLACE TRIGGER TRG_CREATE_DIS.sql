create or replace trigger trg_create_disponibilidad_asiento after
   insert on funcion
   for each row
declare
   v_id_asiento number;
begin
   for asiento_rec in (
      select id_asiento
        from asiento
       where id_sala = :new.id_sala
   ) loop
      insert into disponibilidad_asiento (
         id_asiento,
         id_funcion,
         estado,
         bloqueado_hasta
      ) values ( asiento_rec.id_asiento,
                 :new.id_funcion,
                 'disponible',
                 null );
   end loop;
end;
/