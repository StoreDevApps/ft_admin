import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { ConfirmationService, FilterService, MessageService, SelectItem } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';


interface Producto {
  presentacion: string;
  seccion: string;
  detalle: string;
  marca: string;
  codigo: string;
  fechaVencimiento: Date;
  unidades: number;
  pvp: number;
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
    FormsModule
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
  producto!: Producto;
  submitted: boolean = false;
  productos: Producto[] = [];

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.statuses = [
      { label: 'En stock', value: 'INSTOCK' },
      { label: 'Bajo stock', value: 'LOWSTOCK' },
      { label: 'Agotado', value: 'OUTOFSTOCK' }
    ];

    this.secciones = [
      { label: 'A1', value: 'A1' },
      { label: 'A2', value: 'A2' },
      { label: 'A3', value: 'A3' }
    ];
    this.statusValue = '';
    this.productos = [
      {
        codigo: '123456',
        detalle: 'Producto A',
        presentacion: 'Caja',
        seccion: 'A1',
        marca: 'Marca X',
        unidades: 10,
        pvp: 20.5,
        fechaVencimiento: new Date(),
        status: 'INSTOCK',
        image: 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'
      },
      {
        codigo: '654321',
        detalle: 'Producto B',
        presentacion: 'Caja',
        seccion: 'A1',
        marca: 'Marca Y',
        unidades: 5,
        pvp: 15.25,
        fechaVencimiento: new Date(),
        status: 'LOWSTOCK',
        image: 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'
      }
  
    ];
  }
  
  ngOnInit() {
    this.loading = false;
}

  crearNuevoRegistro() {
    // Lógica para crear un nuevo registro de inventario
    console.log('Crear nuevo registro de inventario');
  }

  clear(table: Table) {
    table.clear();
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'info';
    }
  }

  openNew() {
    this.producto = {
      presentacion: '',
      seccion: '',
      detalle: '',
      marca: '',
      codigo: '',
      fechaVencimiento: new Date(),
      unidades: 0,
      pvp: 0,
      status: '',
      image: ''
    };
    this.submitted = false;
    this.productDialog = true;
  }

  editProduct(producto: Producto) {
    this.producto = { ...producto };
    this.productDialog = true;
  }

  deleteProduct(producto: Producto) {
    this.confirmationService.confirm({
        message: 'Esta seguro/a de eliminar el producto ' + producto.detalle + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.productos = this.productos.filter((val) => val.codigo !== producto.codigo);
            this.producto = {
              presentacion: '',
              seccion: '',
              detalle: '',
              marca: '',
              codigo: '',
              fechaVencimiento: new Date(),
              unidades: 0,
              pvp: 0,
              status: '',
              image: ''
            };
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Producto Eliminado', life: 3000 });
        }
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    // if (this.product.name?.trim()) {
    //     if (this.product.id) {
    //         this.products[this.findIndexById(this.product.id)] = this.product;
    //         this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
    //     } else {
    //         this.product.id = this.createId();
    //         this.product.image = 'product-placeholder.svg';
    //         this.products.push(this.product);
    //         this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
    //     }

    //     this.products = [...this.products];
    //     this.productDialog = false;
    //     this.product = {};
    // }
}

onUpload(event: any) {
  const file = event.files[0];
  if (file) {
  const reader = new FileReader();
  reader.onload = (e: any) => this.producto.image = e.target.result;
  reader.readAsDataURL(file);
}

}

}
