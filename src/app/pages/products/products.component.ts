import { Component } from '@angular/core';
import { NavbarComponent } from '../../componentes/navbar/navbar.component';
import { ProductCardNoLoginComponent } from '../../componentes/product-card-no-login/product-card-no-login.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NavbarComponent, ProductCardNoLoginComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

}
