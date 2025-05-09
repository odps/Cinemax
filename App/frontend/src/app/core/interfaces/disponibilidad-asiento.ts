import { Asiento } from './asiento';
import { Funcion } from './funcion';

export interface DisponibilidadAsiento {
  id: number;
  idAsiento: Asiento;
  idFuncion: Funcion;
  estado: String;
  bloqueadoHasta?: Date;
}
