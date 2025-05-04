import { Usuario } from './usuario';
import { Cine } from './cine';

export interface Review {
  id: number;
  usuario: Usuario;
  cine: Cine;
  puntuacion: number;
  comentario: string;
  fechaReview: string;
}
