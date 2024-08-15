import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { BadgeModule } from 'primeng/badge';
import { CarritoService } from '../../../services/carrito/carrito.service';


@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, BadgeModule],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss'
})
export class UserLayoutComponent {

  userName: string | null = null;
  cartItemCount: number = 0; 

  constructor(private authService: AuthService,private router: Router, private carritoService: CarritoService) {}
  
  ngOnInit(): void {
    this.loadUserName();
    this.carritoService.getCartItemCount().subscribe(count => {
      console.log('Item count received:', count);  // Log para verificar si se recibe el conteo
      this.cartItemCount = count;
    });
    this.carritoService.updateCartItemCount();  // Inicializa el conteo de ítems en el carrito
  }
  

  loadUserName(): void {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decoded: any = this.authService.decodeToken(token);
      const userId = decoded.user_id;

      this.authService.getUserDetails(userId).subscribe(
        (user) => {
          this.userName = `${user.name} ${user.last_name}`.trim();
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    }
  }

  loadCartItemCount(): void {
    this.carritoService.getCartItemCount().subscribe(
      (count: number) => {
        this.cartItemCount = count;
      },
      (error: any) => {
        console.error('Error fetching cart item count:', error);
      }
    );
  }
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
