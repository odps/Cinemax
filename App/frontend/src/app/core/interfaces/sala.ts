import {Cine} from './cine';
import {Funcion} from './funcion';

export interface Sala {
  id?: number;
  cine?: Cine;
  nombre: string;
  capacidad: number;
  asientos: any[];
  funciones?: Funcion[];
}
