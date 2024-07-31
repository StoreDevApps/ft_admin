import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { FilterService, SelectItem } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';

interface Inventario {
  presentacion: string;
  seccion: string;
  detalle: string;
  marca: string;
  codigo: string;
  fechaVencimiento: Date;
  unidades: number;
  pvp: number;
  status: string;
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
    CommonModule,
    FormsModule,
  ],
  templateUrl: './admin-inventory.component.html',
  styleUrl: './admin-inventory.component.scss',
})
export class AdminInventoryComponent {
  loading: boolean = true;
  searchValue: string = '';
  statuses: SelectItem[];
  statusValue: string;

  constructor(private filterService: FilterService) {
    this.statuses = [
      { label: 'En stock', value: 'INSTOCK' },
      { label: 'Bajo stock', value: 'LOWSTOCK' },
      { label: 'Agotado', value: 'OUTOFSTOCK' }
    ];
    this.statusValue = '';
  }


  inventarios: Inventario[] = [
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
    }

  ];
  
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
}
