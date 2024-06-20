import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  base_url = environment.API_BASE_URL;

  getProductsWithoutLogin() {
    return this.http.get(`${this.base_url}api/products-without-login/`);
  }
}
