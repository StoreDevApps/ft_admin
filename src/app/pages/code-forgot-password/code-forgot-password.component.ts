import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CodeForgotPasswordService } from '../../services/code-forgot-password.service';

@Component({
  selector: 'app-code-forgot-password',
  standalone: true,
  imports: [],
  templateUrl: './code-forgot-password.component.html',
  styleUrl: './code-forgot-password.component.scss'
})
export class CodeForgotPasswordComponent {

  constructor(private router : Router, private codeForgotPasswordService: CodeForgotPasswordService) {
    this.correo = this.router.getCurrentNavigation()?.extras.state?.['email'] || '';
  }

  correo = '';
  codigoIngresado = '';
  codigoIngresadoIncorrecto = false;
  errorTextoCodigo = '';
  
  checkCode(event: any, nextIndex: number | undefined = undefined) {
    this.errorTextoCodigo = '';
    this.codigoIngresadoIncorrecto = false;
    const input = event.target as HTMLInputElement;
    if (event.key === 'e') {
      input.value = '';
      return;
    }
    if (input.value.length > 1) {
      input.value = input.value.slice(0, 1);
    }
    if (input.value.length === 1) {
      if(nextIndex){
        this.codigoIngresado += input.value;
        const nextInput = document.getElementById(`numbercode${nextIndex}`) as HTMLInputElement;
        if (nextInput) {
          nextInput.focus();
        }
      }else{
        this.codigoIngresado += input.value;
        this.verifyEnterCode();
      }
    }
  }

  verifyEnterCode() {
    this.codeForgotPasswordService.verifyCode(this.correo, this.codigoIngresado).subscribe({
      next: (res: any) => {
        if (res) {
          this.router.navigate(['/change-forgot-password'], { state: { email: this.correo } });
        }
      },
      error: (err: any) => {
        this.codigoIngresadoIncorrecto = true;
        this.codigoIngresado = '';

        const input1 = (document.getElementById('numbercode1') as HTMLInputElement);
        input1.focus();
        input1.value = '';
        this.errorTextoCodigo = 'El código ingresado es incorrecto';
        (document.getElementById('numbercode2') as HTMLInputElement).value = '';
        (document.getElementById('numbercode3') as HTMLInputElement).value = '';
        (document.getElementById('numbercode4') as HTMLInputElement).value = '';
      }
    });
  }
  
}
