import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { PublicService } from '../../../services/public/public.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [TabViewModule, TableModule, ButtonModule, InputTextModule, DialogModule,ConfirmDialogModule, ToastModule],
  providers: [ MessageService, ConfirmationService],
  templateUrl: './admin-settings.component.html',
  styleUrl: './admin-settings.component.scss'
})
export class AdminSettingsComponent {

  images: any[] = [];
  services: any[] = [];

  constructor(private publicService: PublicService, private messageService: MessageService, private confirmationService: ConfirmationService) {}

  ngOnInit() {
    this.loadImages();
    this.loadServices();
  }

  loadImages() {
    this.publicService.getCarouselImages().subscribe({
      next: (data) => {
        if (data.success){
          this.images = data.carousel_images;
        }
      },
      error: (error) => {
        console.error('Error loading carousel images:', error);
      }
    })
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
    this.confirmationService.confirm({
        message: 'Esta seguro/a de eliminar el producto ' + image.name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.images = this.images.filter((val) => val.name !== image.name);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Imagen Eliminada', life: 3000 });
        }
    });
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
