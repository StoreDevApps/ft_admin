import { HttpEvent, HttpHandlerFn, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

export function authInterceptorFn(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService); 
  const accessToken = localStorage.getItem('access_token');
  let clonedRequest = req;

  if (accessToken) {
    clonedRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
    });
  }

  return next(clonedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return authService.refreshAccessToken().pipe(
          switchMap((newTokenResponse: any) => {
            const newAccessToken = newTokenResponse.access;
            localStorage.setItem('access_token', newAccessToken);

            const retryRequest = req.clone({
              headers: req.headers.set('Authorization', `Bearer ${newAccessToken}`)
            });
            return next(retryRequest);
          }),
          catchError(refreshError => {
            authService.logout();
            return throwError(refreshError);
          })
        );
      } else {
        return throwError(error);
      }
    })
  );
}
