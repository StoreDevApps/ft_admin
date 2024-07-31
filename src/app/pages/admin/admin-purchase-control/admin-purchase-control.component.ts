import { CommonModule } from '@angular/common';
import { Component, OnInit  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { AutoCompleteModule } from 'primeng/autocomplete';

interface Supplier {
  name: string;
  cost: number;
  lastPurchase: Date;
  address: string;
  phone: string;
}

interface PurchaseHistory {
  supplier: string;
  cost: number;
  purchaseDate: Date;
  address: string;
  phone: string;
}

@Component({
  selector: 'app-admin-purchase-control',
  standalone: true,
  imports: [TableModule, CommonModule, FormsModule, AutoCompleteModule],
  templateUrl: './admin-purchase-control.component.html',
  styleUrl: './admin-purchase-control.component.scss'
})
export class AdminPurchaseControlComponent {

  productCodes: string[] = ['P001', 'P002', 'P003'];
  productName: string = 'Producto A';
  totalInventory: number = 100;
  lastPurchaseDate: Date = new Date();

  filteredCodes: string[] = ['P001', 'P002', 'P003'];
  selectedCode: string = '';

  recentSuppliers: Supplier[] = [
    { name: 'Proveedor A', cost: 50, lastPurchase: new Date(), address: 'Dirección A', phone: '123456789' },
    { name: 'Proveedor B', cost: 60, lastPurchase: new Date(), address: 'Dirección B', phone: '987654321' }
  ];

  purchaseHistory: PurchaseHistory[] = [
    { supplier: 'Proveedor A', cost: 50, purchaseDate: new Date(), address: 'Dirección A', phone: '123456789' },
    { supplier: 'Proveedor B', cost: 60, purchaseDate: new Date(), address: 'Dirección B', phone: '987654321' },
    { supplier: 'Proveedor C', cost: 55, purchaseDate: new Date(), address: 'Dirección C', phone: '456123789' }
  ];

  constructor() {}

  ngOnInit(): void {}

  filter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
  }

  filterCodes(event : any) {
    let query = event.query;
    this.filteredCodes = this.productCodes.filter(code => code.toLowerCase().includes(query.toLowerCase()));
  }

}
