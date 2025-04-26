import { Pelicula } from './pelicula';
import {Sala} from './sala';

export interface Funcion {
  id?: number;
  idPelicula: Pelicula;
  idSala: Sala;
  fechaHora: Date;
  precio: number;
  dispoAsientos: any[]; // Podría definirse una interfaz específica para asientos disponibles
  tickets: any[]; // Podría definirse una interfaz específica para tickets
}
