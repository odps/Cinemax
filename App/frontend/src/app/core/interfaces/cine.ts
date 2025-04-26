export interface Cine {
  id?: number;
  nombre: string;
  direccion: string;
  ciudad: string;
  nif: string;
  reviews: any[]; // Podría definirse una interfaz específica para reviews
}
