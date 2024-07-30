import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-worker',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-worker.component.html',
  styleUrl: './create-worker.component.scss'
})
export class CreateWorkerComponent {
  nombres: string;
  apellidos: string;
  correo: string;
  telefono: string;
  cedula: string;

  constructor() {
    this.nombres = '';
    this.apellidos = '';
    this.correo = '';
    this.telefono = '';
    this.cedula = '';
  }

  onSubmit() {
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviando los datos a un servidor
    console.log('Trabajador creado:', {
      nombres: this.nombres,
      apellidos: this.apellidos,
      correo: this.correo,
      telefono: this.telefono,
      cedula: this.cedula
    });
    
    this.nombres = '';
    this.apellidos = '';
    this.correo = '';
    this.telefono = '';
    this.cedula = '';
    
  }
}
