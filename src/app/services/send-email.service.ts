import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {
  constructor(private http: HttpClient) {}
  base_url = environment.API_BASE_URL;

  postEmailContactUs(email:any) {
    return this.http.post(`${this.base_url}api/contactus/`,email);
  }
}
