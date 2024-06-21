import { Component } from '@angular/core';
import { NavbarComponent } from '../../componentes/navbar/navbar.component';
import { ProductCardNoLoginComponent } from '../../componentes/product-card-no-login/product-card-no-login.component';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NavbarComponent, ProductCardNoLoginComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  products: any[] = [];

  constructor(
    private productsService: ProductsService
  ) {}
  
  ngOnInit() {
    this.productsService.getProductsWithoutLogin()
    .subscribe({
      next: (data:any) => {
        if (data.success) {
          this.products = data.products;
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
