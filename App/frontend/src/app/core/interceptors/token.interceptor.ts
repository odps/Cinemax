import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  // Se obtiene el token de autenticación almacenado en localStorage
  const token = localStorage.getItem('authToken');

  // Si existe un token, se agrega al encabezado Authorization de la petición
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req);
};
