import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../models/Product';
import { CommonModule } from '@angular/common';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ClienteService } from '../../../services/client/cliente.service';
import { DividerModule } from 'primeng/divider';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-user-product',
  standalone: true,
  imports: [CommonModule, ScrollPanelModule, DividerModule,RatingModule, FormsModule, ToastModule, PanelModule],
  templateUrl: './user-product.component.html',
  styleUrls: ['./user-product.component.scss'],
  providers: [MessageService] 
})
export class UserProductComponent implements OnInit {
  product: Product | undefined;
  fotoPrincipal: string | undefined;
  images: string[] = [];
  videos: string[] = [];
  localRating: number | undefined;
  cartQuantity: number = 0;
  maxQuantity: number = 10; 

  constructor(    
    private router: Router,
    private clienteService: ClienteService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.product = history.state.product as Product;
    if (this.product) {
      this.localRating = this.product.average_rating;
      this.loadImages();
      this.videos = this.product.videos;
      this.loadProductRatings();
      this.loadCartQuantity();
    }
  }

  loadProductRatings(): void {
    if (this.product?.id) {
      this.clienteService.getProduct(this.product.id).subscribe((data: any) => {
        if (this.product) {
          this.product.average_rating = data.average_rating;
          this.product.rating_count = data.rating_count;
          this.localRating = this.product.average_rating;
        }
      });
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

  increaseQuantity(): void {
    if (this.cartQuantity < this.maxQuantity) {
      this.cartQuantity++;
      this.updateCart();
    }else{
      this.messageService.add({ severity: 'warn', summary: 'Cantidad no permitida', detail: 'Actualmente no contamos con más de esas cantidad de mercadería', life: 3000 });
    }
  }

  decreaseQuantity(): void {
    if (this.cartQuantity > 0) {
      this.cartQuantity--;
      this.updateCart();
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Cantidad no permitida', detail: 'No puedes tener menos de 0 en el carrito', life: 3000 });
    }
  }

  loadCartQuantity(): void {
  }

  updateCart(): void {
    }
}
