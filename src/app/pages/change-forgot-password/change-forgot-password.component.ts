import { Component, ElementRef, NgModule, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CodeForgotPasswordService } from '../../services/code-forgot-password.service';
import { LoadingComponent } from '../../componentes/loading/loading.component';

@Component({
  selector: 'app-change-forgot-password',
  standalone: true,
  imports: [FormsModule, RouterLink, LoadingComponent],
  templateUrl: './change-forgot-password.component.html',
  styleUrl: './change-forgot-password.component.scss',
})
export class ChangeForgotPasswordComponent {
  @ViewChild('form') form?: ElementRef;
  password1: any;
  password2: any;
  textErrorPassword1: string = '';
  errorPassword1: Boolean = false;
  textErrorPassword2: string = '';
  errorPassword2: Boolean = false;
  correo: string = '';
  success: boolean = false;
  error: boolean = false;
  textError = '';
  loading: boolean = false;

  constructor(private router: Router, private codeForgotPasswordService: CodeForgotPasswordService) {
    this.correo =
      this.router.getCurrentNavigation()?.extras.state?.['email'] || '';
  }
  submitForm() {
    if (this.validateFields()) {
      this.loading = true;
      this.codeForgotPasswordService
        .changePassword(this.correo, this.password1)
        .subscribe({
          next: (res: any) => {
            if (res.success) {
              setTimeout(() => {
                this.error = false;
                this.loading = false;
                this.success = true;
                setTimeout(() => {
                  this.router.navigate(['/login']);
                }, 1000);
              }, 1000);
            }else{
              setTimeout(() => {
                this.loading = false;
                this.error = true;
                this.textError = res.mensaje || 'No se ha podido cambiar la contraseña. Por favor intentelo de nuevo.';
              }, 500);
            }
          },
          error: (err: any) => {
            setTimeout(() => {
              this.loading = false;
              this.error = true;
              this.textError = err.error.error || err.error.mensaje || 'No se ha podido cambiar la contraseña. Por favor intentelo de nuevo.';
            }, 500);
          },
        });
    }
  }

  validateFields() {
    let result = true;
    if (this.password1.length === 0) {
      this.errorPassword1 = true;
      this.textErrorPassword1 = 'La contraseña es requerida';
      result = false;
    } else if (this.password1.length < 8) {
      this.errorPassword1 = true;
      this.textErrorPassword1 = 'La contraseña debe tener al menos 8 caracteres';
      result = false;
    } else if (this.password1.length > 16) {
      this.errorPassword1 = true;
      this.textErrorPassword1 = 'La contraseña debe tener menos de 16 caracteres';
      result = false;
    } else {
      this.errorPassword1 = false;
      this.textErrorPassword1 = '';
    }
    if (this.password2.length === 0) {
      this.errorPassword2 = true;
      this.textErrorPassword2 = 'La contraseña es requerida';
      result = false;
    } else if (this.password1 !== this.password2) {
      this.errorPassword2 = true;
      this.textErrorPassword2 = 'Las contraseñas no coinciden';
      result = false;
    } else {
      this.errorPassword2 = false;
      this.textErrorPassword2 = '';
    }

    return result;
  }
}
