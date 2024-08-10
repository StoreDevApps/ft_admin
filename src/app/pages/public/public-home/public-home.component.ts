import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicService } from '../../../services/public/public.service';

@Component({
  selector: 'app-public-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './public-home.component.html',
  styleUrl: './public-home.component.scss'
})
export class PublicHomeComponent {


  carouselImages: any[] = [];

  constructor(private publicService: PublicService) { }

  ngOnInit(): void {
    this.publicService.getCarouselImages().subscribe({
      next: (data) => {
        if (data.success){
          this.carouselImages = data.carousel_images;
        }
      },
      error: (error) => {
        console.error('Error loading carousel images:', error);
      }
    })
  }



}
