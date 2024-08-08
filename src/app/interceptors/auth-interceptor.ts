import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('access_token');
    let clonedRequest = req;

    if (accessToken) {
      clonedRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
      });
    }

    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.authService.refreshAccessToken().pipe(
            switchMap((newTokenResponse: any) => {
              const newAccessToken = newTokenResponse.access;
              localStorage.setItem('access_token', newAccessToken);

              const retryRequest = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${newAccessToken}`)
              });

              return next.handle(retryRequest);
            })
          );
        } else {
          return throwError(error);
        }
      })
    );
  }
}
