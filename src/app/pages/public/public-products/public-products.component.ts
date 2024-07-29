import { Component } from '@angular/core';
import { ProductCardNoLoginComponent } from '../../../componentes/product-card-no-login/product-card-no-login.component';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-public-products',
  standalone: true,
  imports: [ProductCardNoLoginComponent],
  templateUrl: './public-products.component.html',
  styleUrl: './public-products.component.scss'
})
export class PublicProductsComponent {

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
