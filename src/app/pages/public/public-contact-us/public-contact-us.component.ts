import { Component } from '@angular/core';
import { validarCorreoElectronico } from '../../../../utils/utils';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { SendEmailService } from '../../../services/send-email.service';
import { MessageModule } from 'primeng/message';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-public-contact-us',
  standalone: true,
  imports: [FormsModule, InputTextModule, InputTextareaModule, ButtonModule, CommonModule, MessageModule, CheckboxModule],
  templateUrl: './public-contact-us.component.html',
  styleUrl: './public-contact-us.component.scss'
})
export class PublicContactUsComponent {

  nombre: string = '';
  correo: string = '';
  mensaje: string = '';
  submitted: boolean = false;
  email: any = {}

  constructor(private sendEmailService: SendEmailService) { }

  onSubmit() {

    if(this.correo.length === 0 || !validarCorreoElectronico(this.correo)){
      alert('El correo no es valido');
      return;
    }

    if(this.nombre.length < 10 || /^([0-9])*$/.test(this.nombre)){
      alert('El nombre no es valido');
      return;
    }

    if(this.mensaje.length === 0){
      alert('El mensaje no es valido');
      return;
    }

    this.submitted = true;

    this.email = {
      email: this.correo,
      name: this.nombre,
      message: this.mensaje
    }
    
    this.sendEmailService.postEmailContactUs(this.email).subscribe({
      next: () => {
        alert('Se envio el correo correctamente');
        this.nombre = '';
        this.correo = '';
        this.mensaje = '';
        this.submitted = false;
      },
      error: (error) => {
        alert('Error al enviar el correo');
      }
    })

  }

}
