import { Component, ElementRef, NgModule, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SignUpService } from '../../services/sign-up.service';
import { Usuario } from '../../interface/usuario';
import { LoadingComponent } from '../../componentes/loading/loading.component';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, RouterLink, LoadingComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  host: {
    '[attr.aria-valuenow]': 'value'
  },
})
export class SignUpComponent {
  @ViewChild('form') form?: ElementRef;
  password1: string = '';
  textErrorPassword1: string = '';
  errorPassword1: Boolean = false;
  password2: string = '';
  textErrorPassword2: string = '';
  errorPassword2: Boolean = false;
  nombre: string = '';
  textErrorNombre = '';
  errorNombre: Boolean = false;
  apellido: string = '';
  textErrorApellido = '';
  errorApellido: Boolean = false;
  correo: string = '';
  textErrorCorreo = '';
  errorCorreo: Boolean = false;
  telefono: string = '';
  textErrorTelefono = '';
  errorTelefono: Boolean = false;

  success: boolean = false;
  error: boolean = false;
  textError = '';
  loading: boolean = false;

  constructor(private router: Router, private signUpService: SignUpService) {}
  submitForm() {
    if(this.validateFields()){
      const usuario: Usuario = {
        name: this.nombre,
        last_name: this.apellido,
        email: this.correo,
        phone_number: this.telefono,
        rol: environment.USER_USER, 
        password: this.password1
      };

      console.log(usuario);

      this.loading = true;
      this.signUpService.registrarUsuario(usuario).subscribe({
        next: (res: any) => {
          if (res.success) {
            setTimeout(() => {
              this.error = false;
              this.loading = false;
              this.success = true;
              setTimeout(() => {
                this.router.navigate(['/login']);
              }, 2000);
            }, 1000);
          }else{
            setTimeout(() => {
              this.loading = false;
              this.error = true;
              this.textError = res.message || 'No se ha podido registrar el usuario. Por favor intentelo de nuevo.';
            }, 500);
          }
        },
        error: (err: any) => {
          setTimeout(() => {
            this.loading = false;
            this.error = true;
            this.textError = err.error.message || 'No se ha podido registrar el usuario. Por favor intentelo de nuevo.';
          }, 500);
        }})
    }
  }

  validateFields() {
    this.fixData();
    let result = true;
    if(this.nombre.length === 0){
      this.errorNombre = true;
      this.textErrorNombre = 'El nombre es requerido';
      result = false;
    }else{
      this.errorNombre = false;
      this.textErrorNombre = '';
    }
    if(this.apellido.length === 0){
      this.errorApellido = true;
      this.textErrorApellido = 'El apellido es requerido';
      result = false;
    }else{
      this.errorApellido = false;
      this.textErrorApellido = '';
    }
    if(this.correo.length === 0){
      this.errorCorreo = true;
      this.textErrorCorreo = 'El correo es requerido';
      result = false;
    } else if(!this.validarCorreoElectronico(this.correo)){
      this.errorCorreo = true;
      this.textErrorCorreo = 'El correo no es valido';
      result = false;
    } else {
      this.errorCorreo = false;
      this.textErrorCorreo = '';
    }
    if(this.telefono.length === 0){
      this.errorTelefono = true;
      this.textErrorTelefono = 'El telefono es requerido';
      result = false;
    }else if(this.telefono.length < 10){
      this.errorTelefono = true;
      this.textErrorTelefono = 'El telefono debe tener al menos 10 caracteres';
      result = false;
    }else if(this.telefono.length > 10){
      this.errorTelefono = true;
      this.textErrorTelefono = 'El telefono debe tener maximo 10 caracteres';
      result = false;
    }else{
      this.errorTelefono = false;
      this.textErrorTelefono = '';
    }
    if(this.password1.length === 0){
      this.errorPassword1 = true;
      this.textErrorPassword1 = 'La contraseña es requerida';
      result = false;
    }else if(this.password1.length < 8){
      this.errorPassword1 = true;
      this.textErrorPassword1 = 'La contraseña debe tener al menos 8 caracteres';
      result = false;
    }else{
      this.errorPassword1 = false;
      this.textErrorPassword1 = '';
    }
    if(this.password2.length === 0){
      this.errorPassword2 = true;
      this.textErrorPassword2 = 'La contraseña es requerida';
      result = false;
    }else if(this.password1 !== this.password2){
      this.errorPassword2 = true;
      this.textErrorPassword2 = 'Las contraseña no coinciden';
      result = false;
    }else{
      this.errorPassword2 = false;
      this.textErrorPassword2 = '';
    }
    return result;
  }

  validarCorreoElectronico(correo: string): boolean {
    const expresionRegularCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return expresionRegularCorreo.test(correo);
  }

  fixData(){
    this.correo = this.correo.trim();
    this.telefono = this.telefono.trim();
    this.apellido = this.apellido.trim();
    this.nombre = this.nombre.trim();
  }
}
