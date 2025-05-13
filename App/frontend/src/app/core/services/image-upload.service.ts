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
   * Sube una imagen al backend y retorna el nombre del archivo guardado.
   * @param file Archivo de imagen a subir
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
