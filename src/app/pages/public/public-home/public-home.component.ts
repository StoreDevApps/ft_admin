import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SendEmailService } from '../../../services/send-email.service';
import { validarCorreoElectronico } from '../../../../utils/utils';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { PublicService } from '../../../services/public/public.service';

@Component({
  selector: 'app-public-home',
  standalone: true,
  imports: [FormsModule, InputTextModule, InputTextareaModule, ButtonModule, CommonModule],
  templateUrl: './public-home.component.html',
  styleUrl: './public-home.component.scss'
})
export class PublicHomeComponent {
  nombre: string = '';
  correo: string = '';
  mensaje: string = '';
  submitted: boolean = false;

  carouselImages: any[] = [];


  email: any = {}

  constructor(private sendEmailService: SendEmailService, private publicService: PublicService) { }

  ngOnInit(): void {
    this.publicService.getCarouselImages().subscribe({
      next: (data) => {
        if (data.success){
          this.carouselImages = data.carousel_images;
        }
      },
      error: (error) => {
        console.error('Error loading carousel images:', error);
      }
    })
  }

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
