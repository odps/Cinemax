import { Funcion } from './funcion';
export interface Pelicula {
  id?: number;
  titulo: string;
  genero?: string;
  duracion?: number;
  limiteEdad?: string;
  director: string;
  descripcion: string;
  imagenUrl?: string | null;
  funciones: Funcion[];
}
