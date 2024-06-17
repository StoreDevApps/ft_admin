import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CodeForgotPasswordService {
  constructor(private http: HttpClient) {}
  base_url = environment.API_BASE_URL;

  sendCode(correo: string) {
    return this.http.post(
      `${this.base_url}api/administrador/enviarCodigo/`,
      { correo },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  verifyCode(correo: string, codigo: string) {
    return this.http.post(
      `${this.base_url}api/administrador/verificarCodigo/`,
      { correo, codigo },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  changePassword(correo: string, newPassword: string) {
    return this.http.post(
      `${this.base_url}api/reestablecerContra/`,
      { correo, newPassword },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

}
