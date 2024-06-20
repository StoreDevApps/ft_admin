import { Component } from '@angular/core';
import { NavbarComponent } from "../../componentes/navbar/navbar.component";
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-contact-us',
    standalone: true,
    templateUrl: './contact-us.component.html',
    styleUrl: './contact-us.component.scss',
    imports: [NavbarComponent, FormsModule]
})
export class ContactUsComponent {
  nombre: string = '';
  correo: string = '';
  mensaje: string = '';

  onSubmit() {
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviando los datos a un servidor
    console.log('Nombre:', this.nombre);
    console.log('Correo:', this.correo);
    console.log('Mensaje:', this.mensaje);

    // Resetea el formulario
    this.nombre = '';
    this.correo = '';
    this.mensaje = '';
  }
}
