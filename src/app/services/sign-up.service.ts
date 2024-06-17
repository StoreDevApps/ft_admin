import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../interface/usuario';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  private apiUrl = `${environment.API_BASE_URL}api/registrarse/`; 
  
  constructor(private http: HttpClient) {}

  registrarUsuario(usuario: Usuario) {
    return this.http.post(this.apiUrl, usuario);
  }
}
