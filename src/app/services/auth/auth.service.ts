import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, throwError  } from 'rxjs';
import { jwtDecode } from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private base_url = environment.API_BASE_URL;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor(private http: HttpClient, private router: Router) { }

    /**
   * Inicio de sesión de un usuario.
   * @param username El nombre de usuario
   * @param password La contraseña
   * @returns true si el inicio de sesión es exitoso
   */
  login(email: string, password: string): Observable<any> {

    return this.http.post<any>(`${this.base_url}api/token/`, { email, password })
      .pipe(
        tap((response:any) => {
          this.accessToken = response.access;
          this.refreshToken = response.refresh;
          if (this.accessToken && this.refreshToken) {
            localStorage.setItem('access_token', this.accessToken);
            localStorage.setItem('refresh_token', this.refreshToken);
          }
        }),
        catchError(this.handleError)
      )
  }

  /**
   * Cierra la sesión del usuario.
   */
  logout(): void {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/login']);
  }

  /**
   * Verifica si el usuario está autenticado.
   * @returns true si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  /**
   * Obtiene el rol del usuario autenticado.
   * @returns El rol del usuario
   */
  getUserRole(): string | null {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded.role;
    }
    return null;
  }



  refreshAccessToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      return this.http.post(`${this.base_url}api/token/refresh/`, { refresh: refreshToken })
        .pipe(
          tap((response: any) => {
            this.accessToken = response.access;
            if (this.accessToken) {
              localStorage.setItem('access_token', this.accessToken);
            }
          })
        );
    }
    return new Observable(observer => {
      observer.error('No refresh token found');
    });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
