import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

interface Trabajador {
  name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

@Component({
  selector: 'app-create-worker',
  standalone: true,
  imports: [
    FormsModule,
    TabViewModule,
    ToastModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    TagModule,
    DialogModule,
    ConfirmDialogModule,
    CommonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './create-worker.component.html',
  styleUrl: './create-worker.component.scss',
})
export class CreateWorkerComponent {
  nombres: string;
  apellidos: string;
  correo: string;
  telefono: string;
  cedula: string;
  searchValue: string = '';

  nuevoTrabajador: Trabajador = {
    name: '',
    last_name: '',
    email: '',
    phone_number: '',
  };

  submitted: boolean = false;

  trabajadores: Trabajador[] = [];
  loading: boolean = true;

  openNuevoTrabajador: boolean = false;

  constructor() {
    this.nombres = '';
    this.apellidos = '';
    this.correo = '';
    this.telefono = '';
    this.cedula = '';
  }

  ngOnInit() {
    this.cargarTrabajadores();
  }

  crearNuevoTrabajador() {
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviando los datos a un servidor
    console.log('Trabajador creado:', {
      nombres: this.nombres,
      apellidos: this.apellidos,
      correo: this.correo,
      telefono: this.telefono,
      cedula: this.cedula,
    });
    this.submitted = true;

    this.nombres = '';
    this.apellidos = '';
    this.correo = '';
    this.telefono = '';
    this.cedula = '';
  }

  openNewTrabajador() {
    this.openNuevoTrabajador = true;
  }

  closeNewTrabajador() {
    this.openNuevoTrabajador = false;
    this.nuevoTrabajador = {
      name: '',
      last_name: '',
      email: '',
      phone_number: '',
    };
  }

  clear(table: Table) {
    table.clear();
    this.cargarTrabajadores();
  }

  cargarTrabajadores() {
    this.loading = false;
    this.trabajadores = [
      {
        name: 'Luis',
        last_name: 'Perez',
        email: 'luis@perez',
        phone_number: '1234567890',
      },
      {
        name: 'Maria',
        last_name: 'Gonzalez',
        email: 'maria@gonzalez',
        phone_number: '9876543210',
      },
      {
        name: 'Carlos',
        last_name: 'Ramirez',
        email: 'carlos@ramirez',
        phone_number: '5555555555',
      },
      {
        name: 'Ana',
        last_name: 'Martinez',
        email: 'ana@martinez',
        phone_number: '1111111111',
      },
      {
        name: 'Pedro',
        last_name: 'Lopez',
        email: 'pedro@lopez',
        phone_number: '2222222222',
      },
      {
        name: 'Jorge',
        last_name: 'Sanchez',
        email: 'jorge@lopez',
        phone_number: '3333333333',
      },
      {
        name: 'Sofia',
        last_name: 'Hernandez',
        email: 'sofia@hernandez',
        phone_number: '4444444444',
      },
      {
        name: 'Andres',
        last_name: 'Torres',
        email: 'andres@torres',
        phone_number: '5555555555',
      },
      {
        name: 'Gabriel',
        last_name: 'Garcia',
        email: 'gabriel@garcia',
        phone_number: '6666666666',
      },
      {
        name: 'Valentina',
        last_name: 'Ramirez',
        email: 'valentina@ramirez',
        phone_number: '7777777777',
      },
      {
        name: 'Camila',
        last_name: 'Lopez',
        email: 'camila@lopez',
        phone_number: '8888888888',
      },
    ];
  }

  convertToAdmin(trabajador: Trabajador) {
    throw new Error('Method not implemented.');
  }
}
