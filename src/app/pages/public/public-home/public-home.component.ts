import { Component } from '@angular/core';
import { NavbarComponent } from '../../../componentes/navbar/navbar.component';

@Component({
  selector: 'app-public-home',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './public-home.component.html',
  styleUrl: './public-home.component.scss'
})
export class PublicHomeComponent {

}
