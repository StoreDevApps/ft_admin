import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        const userRole = this.authService.getUserRole();
        if (userRole === 'administrador') {
          this.router.navigate(['/admin']);
        } else if (userRole === 'trabajador') {
          this.router.navigate(['/trabajador']);
        } else {
          this.router.navigate(['/usuario']);
        }
      },
      error: (error) => {
        console.error('Error de login:', error);
      },
    });
  }
}
