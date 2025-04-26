import {Cine} from './cine';

export interface Sala {
  id?: number;
  nombre: string;
  capacidad: number;
  cine: Cine;
  asientos: any[]; // Podría definirse una interfaz específica para asientos
}
