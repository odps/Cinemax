import { Sala } from './sala';
import { DisponibilidadAsiento } from './disponibilidad-asiento';
import { Ticket } from './ticket';

export interface Asiento {
  id: number;
  idSala: Sala;
  fila: string;
  numero: number;
  dispoAsientos?: DisponibilidadAsiento[];
  tickets?: Ticket[];
}
