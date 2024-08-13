import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Categoria } from '../../models/Categoria';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = environment.API_BASE_URL+'api';
  constructor(private http: HttpClient) {}  

  getProductCategories(): Observable<{ success: boolean; product_categories: Categoria[] }> {
    return this.http.get<{ success: boolean; product_categories: Categoria[] }>(`${this.apiUrl}/product-categories/`);
  }
}
