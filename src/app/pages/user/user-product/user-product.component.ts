import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../models/Product';
import { CommonModule } from '@angular/common';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ClienteService } from '../../../services/client/cliente.service';

@Component({
  selector: 'app-user-product',
  standalone: true,
  imports: [CommonModule, ScrollPanelModule],
  templateUrl: './user-product.component.html',
  styleUrls: ['./user-product.component.scss']
})
export class UserProductComponent implements OnInit {
  product: Product | undefined;
  fotoPrincipal: string | undefined;
  images: string[] = [];
  videos: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    this.product = history.state.product as Product;
    if (this.product) {
      this.loadImages();
      this.videos = this.product.videos; // Asumiendo que los videos no necesitan ser transformados
    }
  }
  
  loadImages(): void {
    if (this.product?.images) {
      this.product.images.forEach((imagePath, index) => {
        if (this.isBase64Image(imagePath)) {
          this.images[index] = imagePath;
          if (index === 0) {
            this.fotoPrincipal = this.images[index];
            this.setActiveImage(index);
          }
        } else {
          this.clienteService.getImage(imagePath).subscribe((blob: Blob) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              this.images[index] = reader.result as string;
              if (index === 0) {
                this.fotoPrincipal = this.images[index];
                this.setActiveImage(index);
              }
            };
            reader.readAsDataURL(blob);
          });
        }
      });
    }
  }

  cambiarFotoPrincipal(image: string): void {
    this.fotoPrincipal = image;
    this.updateFotoPrincipalInView();
    const index = this.images.indexOf(image);
    if (index !== -1) {
      this.setActiveImage(index);
    }
  }
  
  updateFotoPrincipalInView(): void {
    const fotoPrincipalElement = document.querySelector('.foto-principal') as HTMLImageElement;
    if (fotoPrincipalElement) {
      fotoPrincipalElement.src = this.fotoPrincipal || '';
    }
  }
  
  setActiveImage(index: number): void {
    const fotoSecundarias = document.querySelectorAll('.foto-secundaria');
    fotoSecundarias.forEach((foto, idx) => {
      if (idx === index) {
        foto.classList.add('active');
      } else {
        foto.classList.remove('active');
      }
    });
  }

  handleMouseEnter(): void {
    console.log("Mouse over 'Ver videos'");
  }

  isBase64Image(data: string): boolean {
    const base64Pattern = /^(data:image\/(jpeg|png|gif|bmp|webp|svg\+xml);base64,|data:application\/octet-stream;base64,)/;
    return base64Pattern.test(data);
  }
}
