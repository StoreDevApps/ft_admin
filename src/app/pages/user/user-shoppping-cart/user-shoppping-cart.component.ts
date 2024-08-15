import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-shoppping-cart',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, InputNumberModule, FormsModule, ],
  templateUrl: './user-shoppping-cart.component.html',
  styleUrl: './user-shoppping-cart.component.scss'
})
export class UserShopppingCartComponent {
  cartItems = [
    { product: 'Cozy Blanket', price: 29.99, quantity: 1 },
    { product: 'Autumn Mug', price: 12.99, quantity: 2 },
    { product: 'Fall Fragrance Candle', price: 16.99, quantity: 1 }
  ];

  getTotal() {
    return this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  removeItem(item: any) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem !== item);
  }

}
