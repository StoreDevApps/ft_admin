import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PublicService {
  private apiUrl = `${environment.API_BASE_URL}api/public/`;

  constructor(private http: HttpClient) { }

  getCarouselImages(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'carousel-home/');
  }
}
