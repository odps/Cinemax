import { Factura } from "./factura";
import { Log } from "./log";
import { Review } from "./review";
import { Rol } from "./rol";
import { Ticket } from "./ticket";

export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  fechaRegistro: string;
  rol: Rol;
  reviews: Review[];
  tickets: Ticket[];
  facturas: Factura[];
  logs: Log[];
}
