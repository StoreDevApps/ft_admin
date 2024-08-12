import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, ToastModule],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router,     private messageService: MessageService, ) {}

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
        this.messageService.add({
          severity: 'error',
          summary: 'Error de inicio de sesión, revisar credenciales e intente nuevamente',
          detail: '',
        });
        this.password = '';
      },
    });
  }
}
