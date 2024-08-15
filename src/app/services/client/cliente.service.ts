import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  getProducts(page: number, pageSize: number, filters: any): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('page_size', pageSize.toString());

    if (filters.categories && filters.categories.length > 0) {
      params = params.set('categories', filters.categories.join(','));
    }
    if (filters.minPrice) {
      params = params.set('minPrice', filters.minPrice);
    }
    if (filters.maxPrice) {
      params = params.set('maxPrice', filters.maxPrice);
    }
    if (filters.searchQuery) {
      params = params.set('searchQuery', filters.searchQuery);
    }
    if (filters.sortOption) {
      params = params.set('sortOption', filters.sortOption);
    }

    return this.http.get(`${this.apiUrl}/products-pagination/`, { params });
  }

  getProduct(productId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/${productId}/`);
  }

  getImage(imagePath: string): Observable<Blob> {
    const imageUrl = `${this.apiUrl}${imagePath}`;
    return this.http.get(imageUrl, { responseType: 'blob' });
  }

  getProductComments(productId: number, params?: HttpParams): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/${productId}/comments/`, { params });
}

  submitComment(productId: number, rating: number, comment: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/products/${productId}/comments/submit`, {
      rating,
      comment
    });
  }

  updateComment(productId: number, rating: number, comment: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/products/${productId}/comments/update`, {
      puntuacion: rating, 
      comentario: comment 
    });
  }
  
  userHasPurchased(productId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/products/${productId}/has-purchased`);
}

}

