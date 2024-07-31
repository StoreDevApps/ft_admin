import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [TabViewModule, TableModule, ButtonModule, InputTextModule, DialogModule],
  templateUrl: './admin-settings.component.html',
  styleUrl: './admin-settings.component.scss'
})
export class AdminSettingsComponent {

  images: any[] = [];
  services: any[] = [];

  ngOnInit() {
    // Inicialización de datos para imágenes y servicios
    this.loadImages();
    this.loadServices();
  }

  loadImages() {
    // Cargar imágenes desde el servidor o base de datos
    this.images = [
      { name: 'Image1', url: 'https://example.com/image1.jpg' },
      { name: 'Image2', url: 'https://example.com/image2.jpg' },
      // ...
    ];
  }

  loadServices() {
    // Cargar servicios desde el servidor o base de datos
    this.services = [
      { name: 'Service1', category: 'Category1', image: 'https://example.com/service1.jpg', description: 'Description of Service1' },
      { name: 'Service2', category: 'Category2', image: 'https://example.com/service2.jpg', description: 'Description of Service2' },
      // ...
    ];
  }

  addImage() {
    // Lógica para añadir una nueva imagen
  }

  deleteImage(image: any) {
    // Lógica para eliminar una imagen
  }

  moveImageUp(image: any) {
    // Lógica para mover una imagen hacia arriba en la lista
  }

  moveImageDown(image: any) {
    // Lógica para mover una imagen hacia abajo en la lista
  }

  addService() {
    // Lógica para añadir un nuevo servicio
  }

  editService(service: any) {
    // Lógica para editar un servicio existente
  }

  deleteService(service: any) {
    // Lógica para eliminar un servicio
  }

}
