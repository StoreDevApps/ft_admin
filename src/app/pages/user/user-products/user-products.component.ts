import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../../../services/client/cliente.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Categoria } from '../../../models/Categoria';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox'; // Importa el módulo de Checkbox
import { RadioButtonModule } from 'primeng/radiobutton'; 
import { DropdownModule } from 'primeng/dropdown';
import { IconFieldModule } from 'primeng/iconfield'; // Importa el módulo de IconField
import { InputTextModule } from 'primeng/inputtext'; // Importa el módulo de InputText


@Component({
  selector: 'app-user-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastModule,CheckboxModule, RadioButtonModule, DropdownModule, InputTextModule,IconFieldModule], 
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.scss'],
  providers: [MessageService]
})
export class UserProductsComponent implements OnInit {

  categories: Categoria[] = [];
  selectedCategories: { [key: string]: boolean } = {};
  selectedCategoryIds: number[] = []; // Para gestionar las categorías seleccionadas
  priceOption: string = '';
  minPrice: string = '';
  maxPrice: string = '';

  sortOptions: any[] = []; // Para almacenar las opciones de ordenamiento
  selectedSortOption: any; // Para almacenar la opción seleccionada
  
  searchQuery: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private clienteService: ClienteService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/productos']);
    }
    this.loadCategories();
    this.loadOptions();  
  }

  loadOptions(): void{
    this.sortOptions = [
      { label: 'Por precio de mayor a menor', value: 'price-desc' },
      { label: 'Por precio de menor a mayor', value: 'price-asc' },
      { label: 'Por nombre de la A a la Z', value: 'name-asc' },
      { label: 'Por nombre de la Z a la A', value: 'name-desc' }
    ];
  }

  loadCategories(): void {
    this.clienteService.getProductCategories().subscribe((data) => {
      if (data.success) {
        this.categories = data.product_categories;
      } else {
        console.error('Error al cargar las categorías');
      }
    }, error => {
      console.error('Error en la solicitud:', error);
    });
  }

  validateNumberInput(event: KeyboardEvent): void {
    const input = event.key;
    const currentValue = (event.target as HTMLInputElement).value;

    if (!/^\d$/.test(input) && input !== '.' && input !== 'Backspace') {
      event.preventDefault();
    }

    if (input === '.' && currentValue.includes('.')) {
      event.preventDefault();
    }
  }

  clearPriceOption(): void {
    this.priceOption = '';  // Deselecciona el option button
  }

  handleRadioButtonSelection(): void {
    this.minPrice = '';
    this.maxPrice = '';
    this.buscarMenoresDolar();
  }

  handleSearchClick(): void {
    if (!this.minPrice || !this.maxPrice) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ingrese un valor en precio', life: 3000 });
      return;
    }

    const min = parseFloat(this.minPrice);
    const max = parseFloat(this.maxPrice);

    if (min > max) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El valor máximo debe ser mayor o igual al mínimo', life: 3000 });
      return;
    }

    this.buscarPorRangoPrecio();
  }

  handleCategoryChange(category: Categoria): void {
    if (this.selectedCategories[category.id]) {
      this.selectedCategoryIds.push(category.id);
    } else {
      this.selectedCategoryIds = this.selectedCategoryIds.filter(id => id !== category.id);
    }

    this.buscarPorCategoria();
  }

  buscarMenoresDolar(): void {    
    this.messageService.add({ severity: 'success', summary: 'Busqueda realizada', detail: 'Búsqueda de productos menores a $1 completada', life: 3000 });
  }

  buscarPorRangoPrecio(): void {    
    this.messageService.add({ severity: 'success', summary: 'Busqueda realizada', detail: 'Búsqueda por rango de precio completada', life: 3000 });
  }

  buscarPorCategoria(): void {    
    this.messageService.add({ severity: 'info', summary: 'Busqueda realizada', detail: 'Búsqueda por categorías completada', life: 3000 });
  }
  
  handleSearch(): void {    
    console.log("Buscar: ", this.searchQuery);    
  }

  onSortChange(event: any): void {
    const value = event.value;    
  }
}