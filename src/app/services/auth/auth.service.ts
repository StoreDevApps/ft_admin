import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = false;
  private userRole: 'admin' | 'worker' | 'user' | '' = 'user';

  constructor() { }

    /**
   * Inicio de sesión de un usuario.
   * @param username El nombre de usuario
   * @param password La contraseña
   * @returns true si el inicio de sesión es exitoso
   */
  login(username: string, password: string): boolean {
    // Aquí deberías agregar la lógica para verificar las credenciales del usuario.
    // Por simplicidad, aceptaremos cualquier combinación de username y password.
    this.loggedIn = true;
    console.log("correo:", username)
    if(username == "joraazam@espol.edu.ec"){
      console.log("-----correo:", username)
      this.userRole = 'admin';  // Puedes establecer el rol del usuario basado en las credenciales.
    }
    else{
      console.log("****correo:", username)
      this.userRole = 'user';
    }

    return this.loggedIn;
  }

  /**
   * Cierra la sesión del usuario.
   */
  logout(): void {
    this.loggedIn = false;
    this.userRole = '';
  }

  /**
   * Verifica si el usuario está autenticado.
   * @returns true si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    return this.loggedIn;
  }

  /**
   * Obtiene el rol del usuario autenticado.
   * @returns El rol del usuario
   */
  getUserRole(): string | null {
    return this.userRole;
  }
}
