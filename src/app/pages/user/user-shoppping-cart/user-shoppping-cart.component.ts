import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../../services/carrito/carrito.service';

@Component({
  selector: 'app-user-shoppping-cart',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, InputNumberModule, FormsModule, ],
  templateUrl: './user-shoppping-cart.component.html',
  styleUrl: './user-shoppping-cart.component.scss'
})

export class UserShopppingCartComponent implements OnInit {
saveOrder() {
throw new Error('Method not implemented.');
}
continueShopping() {
throw new Error('Method not implemented.');
} 

  cartItems: any[] = [];

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    console.log('ngOnInit called');
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.carritoService.getCartItems().subscribe(
      items => {
        this.cartItems = items.map(item => ({
          id: item.id, 
          product_detail: item.product_detail,
          price: item.price,
          cantidad: item.cantidad
        }));
        console.log('Cart items loaded:', this.cartItems);
      },
      error => {
        console.error('Error fetching cart items:', error);
      }
    );
  }

  getTotal(): number {
    return this.cartItems.reduce((acc, item) => acc + (item.price * item.cantidad), 0);
  }

  removeItem(item: any): void {
    this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
    this.carritoService.updateCartItem(item).subscribe(
      response => {
        console.log('Item removed and updated successfully:', response);
        this.loadCartItems(); // Reload items to reflect the latest changes
      },
      error => {
        console.error('Error updating cart item:', error);
      }
    );
  }

  updateItemQuantity(item: any): void {
    if (item.cantidad < 1) {
      item.cantidad = 1;
    }

    console.log('Updating item quantity:', item);
    this.carritoService.updateCartItem(item).subscribe(
      response => {
        console.log('Item quantity updated successfully:', response);
        this.loadCartItems(); // Reload items to reflect the latest changes
      },
      error => {
        console.error('Error updating cart item quantity:', error);
      }
    );
  }

  increaseQuantity(item: any): void {
    item.cantidad += 1;
    this.updateItemQuantity(item);
  }

  decreaseQuantity(item: any): void {
    if (item.cantidad > 1) {
      item.cantidad -= 1;
      this.updateItemQuantity(item);
    }
  }
}