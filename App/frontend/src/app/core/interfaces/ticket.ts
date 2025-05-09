import { Asiento } from './asiento';
import { Funcion } from './funcion';
import { Usuario } from './usuario';

export interface Ticket {
  id: number;
  usuario: Usuario;
  funcion: Funcion;
  asiento: Asiento;
  fechaCompra: Date;
}
