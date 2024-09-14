import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import {
  ConfirmationService,
  FilterService,
  MessageService,
  SelectItem,
} from 'primeng/api';
import { AdminService } from '../../../services/admin/admin.service';

interface Suplier {
  id?: number;
  name: string;
  email: string;
  phone_number: string;
  direction: string;
}

@Component({
  selector: 'app-admin-supliers',
  standalone: true,
  imports: [
    ToastModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    CommonModule,
    FormsModule,
    InputTextModule
  ],
  providers: [FilterService, MessageService, ConfirmationService],
  templateUrl: './admin-supliers.component.html',
  styleUrl: './admin-supliers.component.scss',
})
export class AdminSupliersComponent {

  loading: boolean = true;
  suplierDialog: boolean = false;
  suplier: Suplier = { name: '', email: '', phone_number: '', direction: '' };
  submitted: boolean = false;
  supliers: Suplier[] = [];
  searchValue: string = '';

  constructor(
    private adminService: AdminService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadSupliers(); // Cargar proveedores al iniciar
  }

  loadSupliers() {
    this.loading = true;
    this.adminService.getSupliers().subscribe({
      next: (data: any) => {
        if (data.success) {
          this.supliers = data.supliers;
          this.loading = false;
        }
      },
      error: (error: any) => {
        console.error('Error al cargar los proveedores', error);
        this.loading = false;
      }
    });
  }

  openNew() {
    this.suplier = { name: '', email: '', phone_number: '', direction: '' };
    this.submitted = false;
    this.suplierDialog = true;
  }

  editSuplier(suplier: Suplier) {
    this.suplier = { ...suplier };
    this.suplierDialog = true;
  }

  deleteSuplier(suplierId: number) {
    this.confirmationService.confirm({
      message: '¿Está seguro de eliminar este proveedor?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.adminService.deleteSuplier(suplierId).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Proveedor eliminado correctamente',
            });
            this.loadSupliers(); // Recargar la lista de proveedores
          },
          error: (error: any) => {
            console.error('Error al eliminar proveedor', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo eliminar el proveedor',
            });
          },
        });
      },
    });
  }

  hideDialog() {
    this.suplierDialog = false;
    this.submitted = false;
  }

  saveSuplier() {
    this.submitted = true;
    if (this.validateData()) {
      this.adminService.saveSuplier(this.suplier).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Proveedor guardado correctamente',
          });
          this.loadSupliers(); // Recargar proveedores
          this.hideDialog(); // Cerrar el diálogo
        },
        error: (error: any) => {
          console.error('Error al guardar proveedor', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo guardar el proveedor',
          });
        },
      });
    }
  }

  validateData() {
    return (
      this.suplier.name &&
      this.suplier.email &&
      this.suplier.phone_number &&
      this.suplier.direction
    );
  }

  clear(table: any) {
    table.clear();
    this.searchValue = '';
    this.loadSupliers();
  }
}