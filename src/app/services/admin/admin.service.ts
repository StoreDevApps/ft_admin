import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private base_url = environment.API_BASE_URL;

  constructor(private http: HttpClient) {}

  uploadNewImagesCarousel(files: File[]): Observable<any> {
    const formData = new FormData();
    files.forEach((image) => {
      const fileNameParts = image.name.split('.');
      const fileExtension = fileNameParts.pop();
      const fileNameWithoutExtension = fileNameParts.join('.');
      const uniqueName = `${fileNameWithoutExtension}-${Date.now()}.${fileExtension}`;

      const fileData = {
        name: fileNameWithoutExtension,
        uniqueNameWithExtension: uniqueName,
      };

      formData.append('fileData[]', JSON.stringify(fileData));
      formData.append('images[]', image, uniqueName);
    });
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<any>(
      `${this.base_url}api/admin/carousel-images/`,
      formData,
      { headers }
    );
  }

  deleteImage(image: any): Observable<any> {
    return this.http.delete<any>(
      `${this.base_url}api/admin/carousel-image/${image.id}/`
    );
  }

  getAdminCategoriesServices(): Observable<any> {
    return this.http.get<any>(`${this.base_url}api/admin/categories-services/`);
  }

  postAdminCategoriesServices(name: string): Observable<any> {
    return this.http.post<any>(
      `${this.base_url}api/admin/categories-services/`,
      { name }
    );
  }

  getAdminServices(): Observable<any> {
    return this.http.get<any>(`${this.base_url}api/admin/services/`);
  }

  postAdminServices(service: any, image: File): Observable<any> {
    const fileNameParts = image.name.split('.');
    const fileExtension = fileNameParts.pop();
    const fileNameWithoutExtension = fileNameParts.join('.');
    const uniqueName = `${fileNameWithoutExtension}-${Date.now()}.${fileExtension}`;

    const fileData = {
      name: fileNameWithoutExtension,
      uniqueNameWithExtension: uniqueName,
    };

    const formData = new FormData();
    formData.append('service', JSON.stringify(service));
    formData.append('fileData', JSON.stringify(fileData));
    formData.append('image', image);
    return this.http.post<any>(`${this.base_url}api/admin/services/`, formData);
  }

  putAdminServices(service: any, image: File): Observable<any> {
    const formData = new FormData();

    if (typeof image !== 'string') {
      const fileNameParts = image.name.split('.');
      const fileExtension = fileNameParts.pop();
      const fileNameWithoutExtension = fileNameParts.join('.');
      const uniqueName = `${fileNameWithoutExtension}-${Date.now()}.${fileExtension}`;

      const fileData = {
        name: fileNameWithoutExtension,
        uniqueNameWithExtension: uniqueName,
      };
      formData.append('fileData', JSON.stringify(fileData));
      formData.append('image', image);
    }

    formData.append('service', JSON.stringify(service));
    return this.http.put<any>(
      `${this.base_url}api/admin/service/${service.id}/`,
      formData
    );
  }

  deleteAdminService(service: any): Observable<any> {
    return this.http.delete<any>(
      `${this.base_url}api/admin/service/${service.id}/`
    );
  }

  getListWorkers(): Observable<any> {
    return this.http.get<any>(`${this.base_url}api/admin/list-workers/`);
  }

  postCreateWorker(nuevoTrabajador: any): Observable<any> {
    return this.http.post<any>(
      `${this.base_url}api/admin/list-workers/`,
      nuevoTrabajador
    );
  }

  postWorkerToAdmin(email: string): Observable<any> {
    return this.http.post<any>(`${this.base_url}api/admin/worker-to-admin/`, {
      email,
    });
  }
  getListadoProductos(): Observable<any> {
    return this.http.get<any>(`${this.base_url}api/admin/products/`);
  }

  postProduct(Product: any): Observable<any> {
    return this.http.post<any>(`${this.base_url}api/admin/products/`, Product);
  }

  putProduct(Product: any): Observable<any> {
    return this.http.put<any>(`${this.base_url}api/admin/products/`, Product);
  }

  postImagenesProduct(product_id: any, files: File[]): Observable<any> {
    const formData = new FormData();
    formData.append('product_id', JSON.stringify(product_id));
    files.forEach((image) => {
      formData.append('images[]', image);
    });
    return this.http.post<any>(
      `${this.base_url}api/admin/product-images/`,
      formData
    );
  }

  deleteProduct(product: any): Observable<any> {
    return this.http.delete<any>(`${this.base_url}api/admin/products/`, {
      body: { id: product.id },
    });
  }

  deleteImageProduct(productId: number, imageUrl: string): Observable<any> {
    return this.http.delete(`${this.base_url}api/products/${productId}/images/`, { body: { url: imageUrl } });
  }
  
  getSupliers(): Observable<any> {
    return this.http.get<any>(`${this.base_url}api/admin/supliers/`);
  }

  saveSuplier(suplier: any): Observable<any> {
    if (suplier.id) {
      // Si el proveedor tiene un id, actualizamos
      return this.http.put<any>(`${this.base_url}api/admin/supliers/`, suplier);
    } else {
      // Si no tiene id, lo creamos
      return this.http.post<any>(`${this.base_url}api/admin/supliers/`, suplier);
    }
  }

  deleteSuplier(suplierId: number): Observable<any> {
    return this.http.delete<any>(`${this.base_url}api/admin/supliers/`, {
      body: { id: suplierId },});
  }

  updateUserProfile(profile: any): Observable<any> {
    return this.http.put<any>(`${this.base_url}api/user/update-profile/`, profile);
}



}
