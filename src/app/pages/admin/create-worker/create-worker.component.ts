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
import { AdminService } from '../../../services/admin/admin.service';

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

  constructor(private adminService: AdminService, private messageService: MessageService, private confirmationService: ConfirmationService) {}

  ngOnInit() {
    this.cargarTrabajadores();
  }

  crearNuevoTrabajador() {
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviando los datos a un servidor
    console.log('Trabajador creado:', this.nuevoTrabajador);
    this.submitted = true;

    if (!this.validarDatos()) {
      return;
    }

    this.adminService.postCreateWorker(this.nuevoTrabajador).subscribe({
      next: (data) => {
        if (data.success) {

          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Se ha creado el usuario',
          })

          this.cargarTrabajadores();

        }
      },
      error: (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo crear el usuario',
        })
      },
    });

    this.closeNewTrabajador();
  }

  validarDatos() {
    return this.nuevoTrabajador.name && this.nuevoTrabajador.last_name && this.nuevoTrabajador.email && this.nuevoTrabajador.phone_number;
  }

  openNewTrabajador() {
    this.openNuevoTrabajador = true;
  }

  closeNewTrabajador() {
    this.openNuevoTrabajador = false;
    this.submitted = false;
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
    this.adminService.getListWorkers().subscribe({
      next: (data) => {
        if (data.success) {
          this.trabajadores = data.workers;
          this.loading = false;
        }
      },
      error: (error) => {
        console.error('Error loading workers:', error);
      },
    })
  }

  convertToAdmin(trabajador: Trabajador) {
    console.log(trabajador);
    this.adminService.postWorkerToAdmin(trabajador.email).subscribe({
      next: (data) => {
        if (data.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Se ha convertido al usuario en administrador',
          })
          this.cargarTrabajadores();
        }
      },
      error: (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo convertir al usuario en administrador',
        })
      },
    })
  }
}
