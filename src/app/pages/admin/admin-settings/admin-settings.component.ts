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
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

interface CategoryService {
  name: string;
  code: number;
}

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
    DropdownModule,
    CommonModule,
    FormsModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './admin-settings.component.html',
  styleUrl: './admin-settings.component.scss',
})
export class AdminSettingsComponent {
  images: any[] = [];
  services: any[] = [];
  categoriesServices: CategoryService[] = [];

  newImages: File[] = [];
  newService: any = {};
  newImageService: File = {} as File;
  tempImageService: File = {} as File;

  newImageDialog: boolean = false;
  newServiceDialog: boolean = false;
  newCategoryServiceDialog: boolean = false;
  submitNewService: boolean = false;
  updateService: boolean = false;

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

  addImages(event: any) {
    this.newImages = [];
    this.newImages.push(...event.files);
  }

  deleteImage(image: any) {
    this.confirmationService.confirm({
      message: 'Esta seguro/a de eliminar el producto ' + image.name + '?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.adminservice.deleteImage(image).subscribe({
          next: (data) => {
            if (data.success) {
              this.loadImages();
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Imagen Eliminada',
                life: 3000,
              });
            }
          },
          error: (error) => {
            console.error('Error deleting image:', error);
          },
        });
      },
    });
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
            this.messageService.add({
              severity: 'info',
              summary: data.message,
              detail: '',
            });
          }
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: error.message,
            detail: '',
          });
          console.error('Error al cargar las imagenes:', error);
        },
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'No hay ninguna imagen seleccionada',
        detail: '',
      });
      console.error('No hay ninguna imagen seleccionada');
    }
  }

  removeImage(event: any) {
    console.log(event.file);
    this.newImages = this.newImages.filter(
      (file) => file.name !== event.file.name
    );
  }

  loadServices() {
    // Cargar servicios desde el servidor o base de datos
    this.services = [];

    this.adminservice.getAdminServices().subscribe({
      next: (data) => {
        if (data.success) {
          this.services = data.services;
          console.log(this.services);
          this.adminservice.getAdminCategoriesServices().subscribe({
            next: (data) => {
              if (data.success) {
                this.categoriesServices = data.categories;
              }
            },
            error: (error) => {
              console.error('Error loading services:', error);
            },
          });
        }
      },
      error: (error) => {
        console.error('Error loading services:', error);
      },
    });
  }

  openNewServiceDialog() {
    this.newServiceDialog = true;
  }

  closeNewServiceDialog() {
    this.newServiceDialog = false;
    this.newImageService = {} as File;
    this.tempImageService = {} as File;
    this.newService = {};
    this.submitNewService = false;
    this.updateService = false;
  }

  addService(event: any) {
    this.tempImageService =
      event.currentFiles[0].objectURL['changingThisBreaksApplicationSecurity'];
    this.newImageService = event.currentFiles[0];
  }

  editService(service: any) {
    this.openNewServiceDialog();
    this.newService = service;
    this.tempImageService = service.image;
    this.newImageService = service.image;
    this.updateService = true;
  }

  removeImageService(event: any) {
    this.newImageService = {} as File;
    this.tempImageService = this.newService.image;
  }

  deleteService(service: any) {
    this.confirmationService.confirm({
      message: 'Esta seguro/a de eliminar el servicio ' + service.name + '?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.adminservice.deleteAdminService(service).subscribe({
          next: (data) => {
            if (data.success) {
              this.loadServices();
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Servicio Eliminado',
                life: 3000,
              });
            }
          },
          error: (error) => {
            console.error('Error deleting service:', error);
          },
        });
      },
    });
  }

  uploadNewService() {
    this.submitNewService = true;

    if (!this.validarDatosModalService()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Faltan campos por rellenar',
        detail: '',
      });
      return;
    }

    if (
      this.categoriesServices.filter((c) => c.name === this.newService.category)
        .length < 1
    ) {
      console.log('Categoría no existe');
      console.log(this.newService.category);
      this.adminservice
        .postAdminCategoriesServices(this.newService.category)
        .subscribe({
          next: (data) => {
            if (data.success) {
              console.log(data);
              this.closeNewServiceDialog();
              this.sendNewService();
            }
          },
          error: (error) => {
            console.error('Error loading services:', error);
            this.messageService.add({
              severity: 'error',
              summary: error.message,
              detail: '',
            });
          },
        });
    } else {
      this.sendNewService();
    }
  }

  validarDatosModalService() {
    let update = true;
    if (!this.newService.name) {
      update = false;
    }
    if (!this.newService.category) {
      update = false;
    }
    if (!this.newService.description) {
      update = false;
    }
    if (
      !this.newImageService.size &&
      typeof this.newImageService !== 'string'
    ) {
      update = false;
    }

    return update;
  }

  sendNewService() {
    if (this.updateService) {
      this.adminservice
        .putAdminServices(this.newService, this.newImageService)
        .subscribe({
          next: (data) => {
            if (data.success) {
              this.closeNewServiceDialog();
              this.loadServices();
              this.messageService.add({
                severity: 'success',
                summary: data.message,
                detail: '',
              });
            }
          },
          error: (error) => {
            console.error('Error loading services:', error);
          },
        });
    } else {
      this.adminservice
        .postAdminServices(this.newService, this.newImageService)
        .subscribe({
          next: (data) => {
            if (data.success) {
              this.closeNewServiceDialog();
              this.loadServices();
              this.messageService.add({
                severity: 'success',
                summary: data.message,
                detail: '',
              });
            }
          },
          error: (error) => {
            console.error('Error loading services:', error);
          },
        });
    }
  }
}
