import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';

interface Supplier {
  id?: number;
  name: string;
  email?: string;
  phone_number?: string;
  direction?: string;
}

interface Product {
  id: number;
  detail: string;
  brand: string;
  code: string;
}

interface ProductHistory {
  id: number;
  date: Date;
  product: Product;
  supplier: Supplier;
  unit_cost_price: number;
  unit_sales_price: number;
  units_purchased: number;
}

@Component({
  selector: 'app-admin-purchase-control',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    FormsModule,
    AutoCompleteModule,
    TabViewModule,
    ToastModule,
    ToolbarModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    ConfirmDialogModule,
    InputTextModule,
    CalendarModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './admin-purchase-control.component.html',
  styleUrl: './admin-purchase-control.component.scss',
})
export class AdminPurchaseControlComponent {
  // Datos para la pestaña Historial General
  loading: boolean = false;
  historyDialog: boolean = false;
  selectedHistory: ProductHistory = this.initNewHistory();
  searchValue: string = '';
  productList: Product[] = [];
  supplierList: Supplier[] = [];
  purchaseHistory: ProductHistory[] = [];
  selectedProduct: Product | null = null;  // Declaramos selectedProduct
  selectedSupplier: Supplier | null = null;

  // Datos para la pestaña Historial por Producto
  filteredCodes: string[] = [];
  selectedCode: string = '';
  productName: string = '';
  totalInventory: number = 0;
  lastPurchaseDate: Date = new Date();
  recentSuppliers: Supplier[] = [];
  productPurchaseHistory: ProductHistory[] = [];

  ngOnInit() {
    // Cargar datos iniciales
    this.loadProducts();
    this.loadSuppliers();
    this.loadPurchaseHistory();
  }

  initNewHistory(): ProductHistory {
    return {
      id: 0,
      date: new Date(),
      product: { id: 0, detail: '', brand: '', code: '' },
      supplier: { id: 0, name: '' },
      unit_cost_price: 0,
      unit_sales_price: 0,
      units_purchased: 0,
    };
  }

  loadProducts() {
    this.productList = [
      { id: 1, detail: 'Producto A', brand: 'Marca A', code: 'ABC123' },
      { id: 2, detail: 'Producto B', brand: 'Marca B', code: 'DEF456' },
    ];
  }

  loadSuppliers() {
    this.supplierList = [
      { id: 1, name: 'Proveedor A' },
      { id: 2, name: 'Proveedor B' },
    ];
  }

  loadPurchaseHistory() {
    this.purchaseHistory = [
      {
        id: 1,
        date: new Date(),
        product: this.productList[0],
        supplier: this.supplierList[0],
        unit_cost_price: 50,
        unit_sales_price: 60,
        units_purchased: 100,
      },
    ];
  }

  openNew() {
    this.selectedHistory = this.initNewHistory();
    this.historyDialog = true;
  }

  editHistory(history: ProductHistory) {
    this.selectedHistory = { ...history };
    this.historyDialog = true;
  }

  deleteHistory(historyId: number) {
    this.purchaseHistory = this.purchaseHistory.filter(
      (h) => h.id !== historyId
    );
  }

  saveHistory() {
    if (this.selectedHistory.id === 0) {
      this.selectedHistory.id = this.purchaseHistory.length + 1;
      this.purchaseHistory.push(this.selectedHistory);
    } else {
      const index = this.purchaseHistory.findIndex(
        (h) => h.id === this.selectedHistory.id
      );
      if (index !== -1) {
        this.purchaseHistory[index] = this.selectedHistory;
      }
    }
    this.historyDialog = false;
  }

  hideDialog() {
    this.historyDialog = false;
  }

  clear(dt: any) {
    dt.clear();
    this.searchValue = '';
  }

  filterCodes(event: any) {
    let query = event.query;
    this.filteredCodes = this.productList
      .map((p) => p.detail)
      .filter((detail) => detail.toLowerCase().includes(query.toLowerCase()));
  }
}
