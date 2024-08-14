import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../../../services/client/cliente.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Categoria } from '../../../models/Categoria';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-user-products',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ToastModule, CheckboxModule, RadioButtonModule,
    DropdownModule, InputTextModule, IconFieldModule, DividerModule, PaginatorModule
  ],
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.scss'],
  providers: [MessageService]
})
export class UserProductsComponent implements OnInit {
  categories: Categoria[] = [];
  selectedCategories: { [key: string]: boolean } = {};
  selectedCategoryIds: number[] = [];
  priceOption: string = '';
  minPrice: string = '';
  maxPrice: string = '';

  sortOptions: any[] = [];
  selectedSortOption: any = null;

  searchQuery: string = '';

  products: any[] = [];
  totalProducts: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;

  cartItems: any[] = [];
  isCartOpen: boolean = false;

  showSortOptions: boolean = false;

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
    this.messageService.add({
      severity: 'success',
      summary: 'Producto añadido',
      detail: `${product.detail} ha sido añadido al carrito`,
      life: 3000
    });
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
    const filters = this.buildFilters();

    this.clienteService.getProducts(page, this.pageSize, filters).subscribe((response) => {
      if (response.success) {
        this.products = response.products;
        this.loadImagesForProducts();
        this.totalProducts = response.total_pages * this.pageSize;
        this.currentPage = page;
        this.showSortOptions = true; // Mostrar opciones de ordenamiento cuando se aplica un filtro
      } else {
        console.error('Error al cargar los productos');
      }
    }, error => {
      console.error('Error en la solicitud:', error);
    });
  }

  buildFilters(): any {
    const trimmedQuery = this.searchQuery.trim().toLowerCase();
    const min = this.minPrice ? parseFloat(this.minPrice) : null;
    const max = this.maxPrice ? parseFloat(this.maxPrice) : null;

    return {
      categories: this.selectedCategoryIds,
      minPrice: min ? min.toString() : '',
      maxPrice: max ? max.toString() : '',
      searchQuery: trimmedQuery,
      sortOption: this.selectedSortOption,
    };
  }

  loadImagesForProducts(): void {
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
    this.priceOption = ''; // Eliminar la selección del RadioButton
  }

  handleRadioButtonSelection(): void {
    this.minPrice = '';
    this.maxPrice = '1'; // Max Price set to 1 for RadioButton

    this.applyFilters(); // Aplicar los filtros acumulativos
  }

  handleSearchClick(): void {
    const min = this.minPrice ? parseFloat(this.minPrice) : null;
    const max = this.maxPrice ? parseFloat(this.maxPrice) : null;

    if (!min && !max) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ingrese un valor en precio', life: 3000 });
      return;
    }

    this.applyFilters(); // Aplicar los filtros acumulativos
  }

  handleCategoryChange(category: Categoria): void {
    if (this.selectedCategories[category.id]) {
      this.selectedCategoryIds.push(category.id);
    } else {
      this.selectedCategoryIds = this.selectedCategoryIds.filter(id => id !== category.id);
    }

    this.applyFilters(); // Aplicar los filtros acumulativos
  }

  applyFilters(): void {
    this.loadPage(1); // Recargar productos desde la primera página con los filtros acumulativos
  }

  handleSearch(): void {
    this.clearFilters(); // Borrar los filtros previos al realizar la búsqueda
    this.applyFilters(); // Aplica la búsqueda con el nuevo término
  }

  onSortChange(event: any): void {
    this.selectedSortOption = event.value;
    this.applyFilters(); // Recargar productos desde la primera página con la nueva opción de ordenamiento
  }

  clearFilters(): void {
    this.selectedCategories = {};
    this.selectedCategoryIds = [];
    this.minPrice = '';
    this.maxPrice = '';
    this.priceOption = '';
    this.selectedSortOption = null;
    this.searchQuery = '';
    this.showSortOptions = false; // Ocultar opciones de ordenamiento cuando se borran los filtros
    this.loadPage(1); // Recargar productos desde la primera página sin filtros
    this.messageService.add({
      severity: 'success',
      summary: 'Filtros borrados',
      detail: 'Todos los filtros han sido borrados',
      life: 3000
    });
  }
}
