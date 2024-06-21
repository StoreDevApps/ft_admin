import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card-no-login',
  standalone: true,
  imports: [],
  templateUrl: './product-card-no-login.component.html',
  styleUrl: './product-card-no-login.component.scss'
})
export class ProductCardNoLoginComponent {
  @Input() product: { id: number, name: string, url: string } = { id: 0, name: 'Lapiz 2B', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS11G0DkaNJ6HAPJ4sTAaHXJjJAcUVbCaHFew&s' };

  onCardClick() {
    console.log(this.product);
  }
}
