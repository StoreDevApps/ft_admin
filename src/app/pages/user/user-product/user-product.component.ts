import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
import { EditorModule } from 'primeng/editor';
import { InplaceModule } from 'primeng/inplace';

@Component({
  selector: 'app-user-product',
  standalone: true,
  imports: [
    CommonModule,
    ScrollPanelModule,
    DividerModule,
    RatingModule,
    FormsModule,
    ToastModule,
    PanelModule,
    InplaceModule,
    EditorModule,
  ],
  templateUrl: './user-product.component.html',
  styleUrls: ['./user-product.component.scss'],
  providers: [MessageService],
})
export class UserProductComponent implements OnInit {
  product: Product | undefined;
  fotoPrincipal: string | undefined;
  images: string[] = [];
  videos: string[] = [];
  localRating: number | undefined;
  cartQuantity: number = 0;
  maxQuantity: number = 10;
  displayEditModal: boolean = false;
  comments: any[] = [];
  userHasPurchased: boolean = false;
  userHasCommented: boolean = false;
  userComment: any = null;
  localComment: string = '';
  commentRating: number | undefined;  // <- Nueva variable para el rating del comentario

  constructor(
    private router: Router,
    private clienteService: ClienteService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.product = history.state.product as Product;
    if (this.product) {
      this.localRating = this.product.average_rating;
      this.commentRating = undefined;
      this.loadImages();
      this.videos = this.product.videos;
      this.loadProductRatings();
      this.loadCartQuantity();
      this.loadComments();
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
        this.images[index] = imagePath;
        if (index === 0) {
          this.fotoPrincipal = imagePath;
          this.setActiveImage(index);
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
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Cantidad no permitida',
        detail: 'Actualmente no contamos con más de esa cantidad de mercadería',
        life: 3000,
      });
    }
  }

  decreaseQuantity(): void {
    if (this.cartQuantity > 0) {
      this.cartQuantity--;
      this.updateCart();
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Cantidad no permitida',
        detail: 'No puedes tener menos de 0 en el carrito',
        life: 3000,
      });
    }
  }

  submitComment(): void {
    if (this.commentRating && this.localComment && this.product?.id) {
      this.clienteService.submitComment(this.product.id, this.commentRating, this.localComment)
        .subscribe(response => {
          this.messageService.add({
            severity: 'success',
            summary: 'Comentario añadido',
            detail: 'Tu comentario ha sido añadido correctamente.',
            life: 3000
          });
          this.loadComments(); // Vuelve a cargar los comentarios para reflejar los cambios
          this.closeInplace(); // Cierra el inplace después de comentar
        }, error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Hubo un problema al añadir tu comentario.',
            life: 3000
          });
        });
    }
  }
  

  updateComment(): void {
    if (this.localRating && this.localComment && this.product?.id) {
      this.clienteService
        .updateComment(this.product.id, this.localRating, this.localComment)
        .subscribe(
          (response) => {
            if (this.product) this.loadComments();
          },
          (error) => {
            // Manejar error
          }
        );
    }
  }

  loadComments(): void {
    const productId = this.product?.id;
    if (productId) {
      this.clienteService.getProductComments(productId).subscribe(data => {
        this.comments = data.comments;
        this.userHasCommented = data.user_has_commented;
        this.userComment = data.user_comment;

        if (this.userHasCommented && this.userComment) {
          this.localRating = this.userComment.rating;
        }
      });

      this.clienteService.userHasPurchased(productId).subscribe(purchased => {
        this.userHasPurchased = purchased;
      });
    }
  }


  closeEditModal(): void {
    this.displayEditModal = false;
  }
  editComment(): void {
    this.displayEditModal = true;
    this.localRating = this.userComment.rating; // Cargar la puntuación actual
    this.localComment = this.userComment.comment; // Cargar el comentario actual
  }

  saveEditedComment(): void {
    console.log('Datos antes de enviar:', {
      rating: this.localRating,
      comment: this.localComment
    });

    if (this.product?.id && this.localRating && this.localComment) {
      this.clienteService
        .updateComment(this.product.id, this.localRating, this.localComment)
        .subscribe(
          (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Comentario actualizado',
              detail: 'Tu comentario ha sido actualizado correctamente.',
              life: 3000,
            });

            this.userComment = response;
            this.localRating = this.userComment.puntuacion;
            this.localComment = this.userComment.comentario;

            this.loadComments();
            this.closeEditModal();
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Hubo un problema al actualizar tu comentario.',
              life: 3000,
            });
          }
        );
    }
  }



  closeInplace(): void {
    this.commentRating = undefined;
    this.localComment = '';
  }


  loadCartQuantity(): void {
    // Implementar la lógica para cargar la cantidad del carrito
  }

  updateCart(): void {
    // Implementar la lógica para actualizar el carrito
  }
}
