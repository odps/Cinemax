export interface Promocion {
  id: number;
  titulo: string;
  descripcion: string;
  tipo: string;
  fechaInicio: string;
  fechaFin: string;
  imagenUrl: string;
  destacada?: boolean;
}
