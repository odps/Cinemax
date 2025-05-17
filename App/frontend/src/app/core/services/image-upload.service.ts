import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  private uploadUrl = environment.apiUrl + '/api/upload';

  constructor(private http: HttpClient) {}

  /**
   * Sube una imagen al servidor y retorna el nombre del archivo guardado.
   * Utiliza FormData para enviar el archivo en la petición POST.
   * Si ocurre un error HTTP, lo propaga para ser manejado externamente.
   */
  uploadImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ filename: string }>(this.uploadUrl, formData).pipe(
      map((res) => res.filename),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }
}
