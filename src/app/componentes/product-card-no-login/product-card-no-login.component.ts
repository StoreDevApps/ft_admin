import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card-no-login',
  standalone: true,
  imports: [],
  templateUrl: './product-card-no-login.component.html',
  styleUrl: './product-card-no-login.component.scss'
})
export class ProductCardNoLoginComponent {
  @Input() product: any = {};

  ngOnInit() {
    console.log(this.product);
    this.product['image'] = this.product['images'][0];
  }

  onCardClick() {
    console.log(this.product);
  }
}
