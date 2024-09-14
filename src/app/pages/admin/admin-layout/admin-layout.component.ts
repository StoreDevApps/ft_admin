import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {

  userName: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}
  logout() {
    //localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.loadUserName();
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

}
