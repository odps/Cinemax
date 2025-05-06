import { Promocion } from './promocion';
import { Review } from './review';
import { Sala } from './sala';

export interface Cine {
  id?: number;
  nombre: string;
  direccion: string;
  ciudad: string;
  nif: string;
  imagenUrl?: string;
  telefono?: string | null;
  descripcion?: string | null;
  horario?: string | null;
  reviews?: Review[];
  promociones?: Promocion[];
  salas?: Sala[];
  cartelera?: { sala: Sala; funciones: any[] }[];
}
