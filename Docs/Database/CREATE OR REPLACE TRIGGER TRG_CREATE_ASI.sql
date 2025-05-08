create or replace trigger trg_create_asientos after
   insert on sala
   for each row
declare
   v_fila              char(2);
   v_numero            number;
   v_capacidad         number := :new.capacidad;
   v_asientos_por_fila constant number := 10;
   v_filas             number;
   i                   number;
   j                   number;
begin
   v_filas := ceil(v_capacidad / v_asientos_por_fila);
   v_fila := 'A';
   for i in 1..v_filas loop
      for j in 1..v_asientos_por_fila loop
         if ( ( i - 1 ) * v_asientos_por_fila + j ) > v_capacidad then
            exit;
         end if;

         insert into asiento (
            id_sala,
            fila,
            numero
         ) values ( :new.id_sala,
                    v_fila,
                    j );
      end loop;

      v_fila := chr(ascii(v_fila) + 1);
   end loop;
end;
/