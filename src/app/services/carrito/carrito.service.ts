import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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

  // Actualizar el conteo de ítems en el carrito
  updateCartItemCount(): void {
    this.http.get<{ count: number }>(`${this.apiURL}/carrito/item-count`).subscribe(
      response => {
        this.cartItemCountSubject.next(response.count);  
      },
      error => {
        console.error('Error fetching cart item count:', error);
      }
    );
  }

  // Añadir un ítem al carrito y actualizar el conteo
  addToCart(productId: number): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/carrito/add`, { productId }).pipe(
      tap(() => {
        this.updateCartItemCount();  // Actualizar el conteo de ítems después de añadir un producto
      })
    );
  }

  // Obtener los ítems del carrito
  getCartItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/carrito/items`);
  }

  // Limpiar el carrito y actualizar el conteo
  clearCart(): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/carrito/clear`, {}).pipe(
      tap(() => {
        this.updateCartItemCount();  // Actualizar el conteo de ítems después de limpiar el carrito
      })
    );
  }

  // Actualizar un ítem del carrito y actualizar el conteo
  updateCartItem(item: any): Observable<any> {
    console.log('Sending item to update:', item); // Verifica el objeto que se está enviando
    return this.http.put<any>(`${this.apiURL}/carrito/items/${item.id}`, item).pipe(
      tap(() => {
        this.updateCartItemCount();  // Actualizar el conteo de ítems después de modificar un ítem
      })
    );
  }

  // Eliminar un ítem del carrito y actualizar el conteo
  removeCartItem(itemId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/carrito/items/${itemId}`).pipe(
      tap(() => {
        this.updateCartItemCount();  // Actualizar el conteo de ítems después de eliminar un ítem
      })
    );
  }
}
