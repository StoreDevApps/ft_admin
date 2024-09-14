import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/Product';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private apiURL = environment.API_BASE_URL + 'api';
  private cartItemCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {}

  // Obtener el número de ítems en el carrito
  getCartItemCount(): Observable<number> {
    return this.cartItemCountSubject.asObservable();
  }

  updateCartItemCount(): void {
    this.http.get<{ count: number }>(`${this.apiURL}/carrito/item-count`).subscribe(
      response => {
        this.cartItemCountSubject.next(response.count);  // Asegúrate de que 'response.count' es un número
      },
      error => {
        console.error('Error fetching cart item count:', error);
      }
    );
  }
  
    
  addToCart(productId: number): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/carrito/add`, { productId }).pipe(
      tap(() => {
        this.updateCartItemCount();  // Actualizar el conteo de ítems después de añadir un producto
      })
    );
  }

  getCartItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/carrito/items`);
  }

  clearCart(): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/carrito/clear`, {}).pipe(
      tap(() => {
        this.updateCartItemCount();  // Actualizar el conteo de ítems después de limpiar el carrito
      })
    );
  }

  updateCartItem(item: any): Observable<any> {
    console.log('Sending item to update:', item); // Verifica el objeto que se está enviando
    return this.http.put<any>(`${this.apiURL}/carrito/items/${item.id}`, item);
  }
}
