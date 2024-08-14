import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Categoria } from '../../models/Categoria';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = environment.API_BASE_URL + 'api';
  constructor(private http: HttpClient) { }

  getProductCategories(): Observable<{ success: boolean; product_categories: Categoria[] }> {
    return this.http.get<{ success: boolean; product_categories: Categoria[] }>(`${this.apiUrl}/product-categories/`);
  }

  getProducts(page: number, pageSize: number, filters?: any): Observable<{ success: boolean; products: any[], total_pages: number }> {
    let params: any = {
      page: page.toString(),
      page_size: pageSize.toString(),
    };

    if (filters) {
      if (filters.categories && filters.categories.length > 0) {
        params.categories = filters.categories.join(',');
      }
      if (filters.minPrice) {
        params.min_price = filters.minPrice;
      }
      if (filters.maxPrice) {
        params.max_price = filters.maxPrice;
      }
    }

    return this.http.get<{ success: boolean; products: any[], total_pages: number }>(
      `${this.apiUrl}/products-pagination/`, { params }
    );
  }
  
  getImage(imagePath: string): Observable<Blob> {
    const imageUrl = `${this.apiUrl}${imagePath}`;
    return this.http.get(imageUrl, { responseType: 'blob' });
  }
}
