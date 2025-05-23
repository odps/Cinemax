import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  // URL base para las peticiones relacionadas a usuarios
  private apiUrl = `${environment.apiUrl}/usuario`;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista completa de usuarios
   */
  getListaUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/lista`);
  }

  /**
   * Obtiene detalles de un usuario por su ID
   */
  getUsuarioPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crea un nuevo usuario
   */
  crearUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/crear`, usuario);
  }

  /**
   * Actualiza un usuario existente. Se permite actualización parcial de campos.
   */
  actualizarUsuario(
    id: number,
    usuario: Partial<Usuario>
  ): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/editar/${id}`, usuario);
  }

  /**
   * Elimina un usuario por su ID
   */
  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar/${id}`);
  }

  /**
   * Obtiene el perfil del usuario autenticado actualmente.
   * El backend determina el usuario a partir del token de autenticación.
   */
  getMiPerfil(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/perfil`);
  }

  /**
   * Actualiza el perfil del usuario autenticado actualmente.
   * Solo se actualizan los campos enviados en el objeto datos.
   */
  actualizarMiPerfil(datos: Partial<Usuario>): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/perfil`, datos);
  }
}
