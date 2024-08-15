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
import { Product } from '../../../models/Product'; 


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
  
  totalProducts: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;

  products: Product[] = [];  // Cambiar de 'any[]' a 'Product[]'
  cartItems: Product[] = [];  // Cambiar de 'any[]' a 'Product[]'
  
  isCartOpen: boolean = false;

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
  addToCart(product: Product): void {  // Cambiar de 'any' a 'Product'
    this.cartItems.push(product);
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
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al cargar las categorías', life: 3000 });
      }
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error en la solicitud de categorías', life: 3000 });
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
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al cargar los productos', life: 3000 });
      }
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error en la solicitud de productos', life: 3000 });
    });
  }

  buildFilters(): any {
    const trimmedQuery = this.searchQuery.trim().toLowerCase();
    const min = this.minPrice ? parseFloat(this.minPrice) : null;
    const max = this.maxPrice ? parseFloat(this.maxPrice) : null;

    let finalMaxPrice = max;
    let finalMinPrice = min;

    // Si el radiobutton está seleccionado, sobrescribir el filtro de precio
    if (this.priceOption === 'less_than_1') {
      finalMaxPrice = 1;
      finalMinPrice = null; // Ignorar el mínimo en este caso
    }

    return {
      categories: this.selectedCategoryIds,
      minPrice: finalMinPrice !== null ? finalMinPrice.toString() : '',
      maxPrice: finalMaxPrice !== null ? finalMaxPrice.toString() : '',
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
            product.images[0] = reader.result as string;  // Asignar la imagen cargada al primer elemento del array
          };
          reader.readAsDataURL(imageBlob);
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al cargar la imagen del producto', life: 3000 });
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
    this.minPrice = ''; // Borrar el mínimo especificado por el usuario
    this.maxPrice = ''; // Borrar el máximo especificado por el usuario
    this.priceOption = 'less_than_1'; // Establecer la opción del radiobutton

    this.applyFilters(); // Aplicar los filtros acumulativos
  }

  handleSearchClick(): void {
    this.priceOption = ''; // Desmarcar cualquier radiobutton si se está utilizando un rango de precios personalizado

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
    this.clearFilters();
    this.clearFiltersPrevios(); // Aplica la búsqueda borrando los filstros previos
  }

  onSortChange(event: any): void {
    this.selectedSortOption = event.value;
    this.applyFilters(); // Recargar productos desde la primera página con la nueva opción de ordenamiento
  }

  clearFiltersPrevios(){
    this.selectedCategories = {};
    this.selectedCategoryIds = [];
    this.minPrice = '';
    this.maxPrice = '';
    this.priceOption = '';
    this.selectedSortOption = null;
  }

  clearFilters(): void {   
    this.clearFiltersPrevios();
    this.searchQuery = '';
    this.loadPage(1); 
  }

  goToProductDetail(product: Product): void {
    const categoria = encodeURIComponent(product.category);
    const nombre = encodeURIComponent(product.detail);
    this.router.navigate([`/usuario/detalle-producto/${categoria}/${nombre}`], { state: { product: product } });
  }

  getProductImage(product: Product): string | undefined {
    if (product.images && product.images.length > 0 && typeof product.images[0] !== 'string') {
      this.clienteService.getImage(product.images[0]).subscribe(imageBlob => {
        const reader = new FileReader();
        reader.onload = () => {
          product.images[0] = reader.result as string;  // Asignar la imagen cargada al primer elemento del array
        };
        reader.readAsDataURL(imageBlob);
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al cargar la imagen del producto', life: 3000 });
      });
    }
    return product.images[0] as string;  // Retornar la imagen si ya está cargada, o undefined si no lo está
  }
}
