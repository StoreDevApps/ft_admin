import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss'
})
export class UserLayoutComponent {

  userName: string | null = null;

  constructor(private authService: AuthService,private router: Router) {}

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
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
