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
import { FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/admin/admin.service';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [
    TabViewModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    FileUploadModule,
    CommonModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './admin-settings.component.html',
  styleUrl: './admin-settings.component.scss',
})
export class AdminSettingsComponent {
  images: any[] = [];
  services: any[] = [];
  newImages: File[] = [];

  newImageDialog: boolean = false;

  constructor(
    private publicService: PublicService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private adminservice: AdminService
  ) {}

  ngOnInit() {
    this.loadImages();
    this.loadServices();
  }

  loadImages() {
    this.images = [];
    this.publicService.getCarouselImages().subscribe({
      next: (data) => {
        if (data.success) {
          this.images = data.carousel_images;
        }
      },
      error: (error) => {
        console.error('Error loading carousel images:', error);
      },
    });
  }

  loadServices() {
    // Cargar servicios desde el servidor o base de datos
    this.services = [
      {
        name: 'Service1',
        category: 'Category1',
        image: 'https://example.com/service1.jpg',
        description: 'Description of Service1',
      },
      {
        name: 'Service2',
        category: 'Category2',
        image: 'https://example.com/service2.jpg',
        description: 'Description of Service2',
      },
      // ...
    ];
  }

  addImages(event: any) {
    this.newImages = [];
    this.newImages.push(...event.files);
  }

  deleteImage(image: any) {
    this.confirmationService.confirm({
      message: 'Esta seguro/a de eliminar el producto ' + image.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        
        this.adminservice.deleteImage(image).subscribe({
          next: (data) => {
            if (data.success) {
              this.loadImages();
              this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Imagen Eliminada', life: 3000});
            }
          },
          error: (error) => {
            console.error('Error deleting image:', error);
          },
        });
      },
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

  openNewImageDialog() {
    this.newImageDialog = true;
  }

  closeNewImageDialog() {
    this.newImageDialog = false;
    this.newImages = [];
  }

  uploadNewImages() {
    if (this.newImages.length > 0) {
      this.adminservice.uploadNewImagesCarousel(this.newImages).subscribe({
        next: (data) => {
          if (data.success) {
            this.loadImages();
            this.closeNewImageDialog();
            this.messageService.add({severity: 'info', summary: data.message, detail: ''});
          }
        },
        error: (error) => {
          this.messageService.add({severity: 'error', summary: error.message, detail: ''});
          console.error('Error al cargar las imagenes:', error);
        },
      })
    } else {
      this.messageService.add({severity: 'error', summary: 'No hay ninguna imagen seleccionada', detail: ''});
      console.error('No hay ninguna imagen seleccionada');
    }
  }

  removeImage(event: any) {
    console.log(event.file);
    this.newImages = this.newImages.filter(file => file.name !== event.file.name);
  }
}
