import { Permiso } from './permiso';

export interface Rol {
  id: number;
  nombre: string;
  permisos: Permiso[];
}
