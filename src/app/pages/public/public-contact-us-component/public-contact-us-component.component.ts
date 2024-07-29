import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SendEmailService } from '../../../services/send-email.service';
import { validarCorreoElectronico } from '../../../../utils/utils';

@Component({
  selector: 'app-public-contact-us-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './public-contact-us-component.component.html',
  styleUrl: './public-contact-us-component.component.scss'
})
export class PublicContactUsComponentComponent {
  nombre: string = '';
  correo: string = '';
  mensaje: string = '';

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
      },
      error: (error) => {
        alert('Error al enviar el correo');
      }
    })

  }
}
