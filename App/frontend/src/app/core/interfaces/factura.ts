import { Ticket } from './ticket';
import { Usuario } from './usuario';

export interface Factura {
  id: number;
  ticket: Ticket;
  usuario: Usuario;
  fechaEmision: string;
  montoTotal: number;
  metodoPago: string;
  estado: string;
}
