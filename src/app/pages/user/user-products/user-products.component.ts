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
import { DividerModule } from 'primeng/divider';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-user-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastModule, CheckboxModule, RadioButtonModule, DropdownModule, InputTextModule, IconFieldModule,
    DividerModule, PaginatorModule 
  ],
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

  products: any[] = [];
  totalProducts: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;

  cartItems: any[] = []; // Array to hold the items in the cart
  isCartOpen: boolean = false; // Boolean to toggle cart visibility

  constructor(
    private authService: AuthService,
    private router: Router,
    private clienteService: ClienteService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/productos']);
    }
    this.loadCategories();
    this.loadOptions();
    this.loadPage(this.currentPage);
  }

  addToCart(product: any): void {
    this.cartItems.push(product);
    this.messageService.add({ severity: 'success', summary: 'Producto añadido', detail: `${product.detail} ha sido añadido al carrito`, life: 3000 });
  }

  toggleCart(): void {
    this.isCartOpen = !this.isCartOpen;
  }

  loadOptions(): void {
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

  loadPage(page: number): void {
    this.clienteService.getProducts(page, this.pageSize).subscribe((response) => {
      if (response.success) {
        this.products = response.products;
        this.products.forEach(product => {
          if (product.images && product.images.length > 0) {
            this.clienteService.getImage(product.images[0]).subscribe(imageBlob => {
              const reader = new FileReader();
              reader.onload = () => {
                product.image = reader.result as string;
              };
              reader.readAsDataURL(imageBlob);
            }, error => {
              console.error('Error al cargar la imagen:', error);
            });
          }
        });
        this.totalProducts = response.total_pages * this.pageSize;
        this.currentPage = page;
      } else {
        console.error('Error al cargar los productos');
      }
    }, error => {
      console.error('Error en la solicitud:', error);
    });
  }  
  
  onPageChange(event: any): void {
    this.pageSize = event.rows;
    this.loadPage(event.page + 1);
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

  clearFilters(): void {    
    this.selectedCategories = {};
    this.selectedCategoryIds = [];
      
    this.minPrice = '';
    this.maxPrice = '';
    this.priceOption = '';
      
    this.selectedSortOption = null;
    this.searchQuery = '';
      
    this.messageService.add({ severity: 'success', summary: 'Filtros borrados', detail: 'Todos los filtros han sido borrados', life: 3000 });
      
    this.buscarPorCategoria();
  }
}
