import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import {
  ConfirmationService,
  FilterService,
  MessageService,
  SelectItem,
} from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { CarouselModule } from 'primeng/carousel';
import { DividerModule } from 'primeng/divider';
import { AdminService } from '../../../services/admin/admin.service';

interface Producto {
  presentation: string;
  category: string;
  detail: string;
  brand: string;
  codigo: string;
  duedate: Date;
  units: number;
  price: number;
  status: string;
  image: string;
}
@Component({
  selector: 'app-admin-inventory',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    CommonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    DropdownModule,
    TagModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    DialogModule,
    ConfirmDialogModule,
    InputNumberModule,
    CalendarModule,
    CommonModule,
    FormsModule,
    CarouselModule,
    DividerModule,
  ],
  providers: [FilterService, MessageService, ConfirmationService],
  templateUrl: './admin-inventory.component.html',
  styleUrl: './admin-inventory.component.scss',
})
export class AdminInventoryComponent {
  loading: boolean = true;
  searchValue: string = '';
  statuses: SelectItem[];
  secciones: SelectItem[];
  statusValue: string;
  productDialog: boolean = false;
  producto!: any;
  submitted: boolean = false;
  productos: Producto[] = [];

  productoSeleccionado: any = {};
  galeriavisible: boolean = false;
  isEditing: boolean = false;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private adminService: AdminService
  ) {
    this.statuses = [
      { label: 'Utiles escolares', value: 'En stock' },
      { label: 'Bajo stock', value: 'Bajo stock' },
      { label: 'Agotado', value: 'Agotado' },
    ];

    this.secciones = [
      { label: 'Utiles escolares', value: 'Utiles escolares' },
      { label: 'A2', value: 'A2' },
      { label: 'A3', value: 'A3' },
    ];
    this.statusValue = '';
  }

  ngOnInit() {
    this.loading = false;
    this.cargarProductos();
  }

  cargarProductos() {
    // Lógica para cargar los registros de inventario
    this.adminService.getListadoProductos().subscribe({
      next: (data) => {
        if (data.success) {
          console.log(data.products);
          this.productos = data.products;
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  crearNuevoRegistro() {
    // Lógica para crear un nuevo registro de inventario
    console.log('Crear nuevo registro de inventario');
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = '';
    this.cargarProductos();
  }

  getSeverity(status: string) {
    switch (status) {
      case 'En stock':
        return 'success';
      case 'Bajo stock':
        return 'warning';
      case 'Agotado':
        return 'danger';
      default:
        return 'info';
    }
  }

  openNew() {
    this.producto = {
      presentation: '',
      category: '',
      detail: '',
      brand: '',
      codigo: '',
      duedate: new Date(),
      units: 0,
      price: 0,
      status: '',
      images: '',
    };
    this.submitted = false;
    this.productDialog = true;
  }

  editProduct(producto: Producto) {
    this.producto = { ...producto };
    this.productDialog = true;
    this.isEditing = true;
  }

  deleteProduct(producto: Producto) {
    this.confirmationService.confirm({
      message:
        'Esta seguro/a de eliminar el producto ' + producto.detail + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.adminService.deleteProduct(producto).subscribe({
          next: (data) => {
            this.cargarProductos();
            this.producto = {
              presentation: '',
              category: '',
              detail: '',
              brand: '',
              codigo: '',
              duedate: new Date(),
              units: 0,
              price: 0,
              status: '',
              images: '',
            };
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Producto Eliminado',
              life: 3000,
            });
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo eliminar el producto',
              life: 3000,
            })
          },
        })
      },
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
    this.producto = {
      presentation: '',
      category: '',
      detail: '',
      brand: '',
      codigo: '',
      duedate: new Date(),
      units: 0,
      price: 0,
      status: '',
      images: '',
    };
    this.isEditing = false;
  }

  saveProduct() {
    this.submitted = true;
    if (this.validateData(this.producto)) {
      if(this.isEditing){
        console.log(this.producto)
        this.adminService.putProduct(this.producto).subscribe({
          next: (data) => {
            console.log(data);
            this.cargarProductos();
            this.hideDialog();
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Producto Actualizado',
              life: 3000,
            })

          },
          error: (error) => {
            console.error(error);
          },
        })
      }
      else{
        this.adminService.postProduct(this.producto).subscribe({
          next: (data) => {
            console.log(data);
            this.cargarProductos();
            this.hideDialog();
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Producto Creado',
              life: 3000,
            })

          },
          error: (error) => {
            console.error(error);
          }
        })
      }
    } 
}

  validateData(producto: any) {
    if (
      this.submitted &&
      !this.producto.codigo &&
      !this.producto.detail &&
      !this.producto.presentation &&
      !this.producto.category &&
      !this.producto.brand &&
      !this.producto.units
    ) {
      return false;
    } else {
      return true;
    }
  }

  viewGallery(producto: any) {
    this.productoSeleccionado = { ...producto };
    this.galeriavisible = true;
  }

  hideGallery() {
    this.galeriavisible = false;
    this.productoSeleccionado = {
      presentation: '',
      category: '',
      detail: '',
      brand: '',
      codigo: '',
      duedate: '',
      units: 0,
      price: '',
      status: '',
      images: '',
    };
  }

  deleteImage(image: string) {
    const productId = this.productoSeleccionado.id;

    // Llamar al servicio para eliminar la imagen en el backend
    this.adminService.deleteImageProduct(productId, image).subscribe({
      next: () => {
        // Filtrar la imagen eliminada de la lista en el frontend
        this.productoSeleccionado.images =
          this.productoSeleccionado.images.filter(
            (img: string) => img !== image
          );
        this.messageService.add({
          severity: 'success',
          summary: 'Imagen eliminada',
          detail: 'La imagen ha sido eliminada exitosamente.',
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar la imagen.',
        });
      },
    });
  }

  onImageUpload(event: any) {
    const files: File[] = event.files;
    if (files.length > 0) {
      this.adminService
        .postImagenesProduct(this.productoSeleccionado.id, files)
        .subscribe({
          next: (data) => {
            if (data.success) {
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Imagenes cargadas correctamente',
              });

              this.cargarProductos();
              this.hideGallery();
            }
          },
          error: (error) => {
            console.error(error);
          },
        });
    }
  }
}
  function validateData(producto: any, any: any) {
    throw new Error('Function not implemented.');
  }

