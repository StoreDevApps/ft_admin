import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private apiUrl = environment.API_BASE_URL + 'api';
  
  constructor(private http: HttpClient) {}

  getCartItemCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/carrito/items/count`);
  }
  
}
