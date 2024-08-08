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
    console.log(this.email, this.password);

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        console.log('Login correcto');
        const userRole = this.authService.getUserRole();
        console.log(userRole);
        if (userRole === 'administrador') {
          console.log('Login correcto admin');
          this.router.navigate(['/admin']);
        } else if (userRole === 'trabajador') {
          console.log('Login correcto trabajador');
          this.router.navigate(['/trabajador']);
        } else {
          console.log('Login correcto usuario');
          this.router.navigate(['/usuario']);
        }
      },
      error: (error) => {
        console.error('Error de login:', error);
      },
    });
  }
}
