import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink, NavigationExtras } from '@angular/router';
import { LoadingComponent } from '../../componentes/loading/loading.component';
import { CodeForgotPasswordService } from '../../services/code-forgot-password.service';
import { FormsModule } from '@angular/forms';
import { validarCorreoElectronico } from '../../../utils/utils';
declare var bootstrap: any;

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterLink, LoadingComponent, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  constructor(
    private router: Router,
    private codeForgotPassword: CodeForgotPasswordService
  ) {}

  @ViewChild('miModal', { static: false })
  miModal?: ElementRef;
  miModalVisible: boolean = false;
  loading: boolean = false;
  email: string = '';
  errorEmail: boolean = false;
  textErrorEmail: string = '';
  titulo : string = '';
  textoModal : string = '';
  success : boolean = false;

  mostrarModal() {
    setTimeout(() => {
      this.loading = false;
      (this.miModal?.nativeElement as HTMLElement).style.display = 'block';
      document.body.classList.add('modal-open');
      this.miModalVisible = true;
    }, 2000);
  }

  sendCode() {

    if(this.email.length === 0){
      this.errorEmail = true;
      this.textErrorEmail = 'El correo es requerido';
      return;
    }else if(!validarCorreoElectronico(this.email)){
      this.errorEmail = true;
      this.textErrorEmail = 'El correo no es valido';
      return;
    }
    else{
      this.errorEmail = false;
      this.textErrorEmail = '';
    }


    this.loading = true;
    this.codeForgotPassword.sendCode(this.email).subscribe({
      next: (response: any) => {
        this.success = response.success;
        if (response.success) {
          this.titulo = 'Código enviado';
          this.textoModal = response.message;
          this.mostrarModal();
        } else {
          this.success = false;
          this.titulo = 'Código no enviado';
          this.textoModal = 'No se ha podido enviar el código. Por favor intentelo de nuevo.';
          this.mostrarModal();
        }
      },
      error: (error: any) => {
        this.titulo = 'Código no enviado';
        this.textoModal = error.error.error || 'No se ha podido enviar el código. Por favor intentelo de nuevo.';
          this.success = false;
          this.mostrarModal();
      },
    });
  }

  goToSendCode() {
    (this.miModal?.nativeElement as HTMLElement).style.display = 'none';
    document.body.classList.remove('modal-open');
    this.miModalVisible = false;
    const navigationExtras: NavigationExtras = {
      state: {
        email: this.email,
      }
    };
    if(this.success){
      this.router.navigate(['/code-forgot-password'], navigationExtras);
    }
  }
}
