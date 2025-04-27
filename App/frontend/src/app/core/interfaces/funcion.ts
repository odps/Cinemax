import { Pelicula } from './pelicula';
import {Sala} from './sala';

export interface Funcion {
  id?: number;
  idPelicula: any; // Podría ser la interfaz Pelicula
  idSala: Sala;
  fechaHora: string;
  precio: number;
  dispoAsientos: any[];
  tickets: any[];
}
