import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-worker-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './worker-layout.component.html',
  styleUrl: './worker-layout.component.scss'
})
export class WorkerLayoutComponent {

  constructor(private router: Router) {}
  logout() {
    //localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

}
