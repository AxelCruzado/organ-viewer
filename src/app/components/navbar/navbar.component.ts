import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [CommonModule,RouterModule ],
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  user: any;

  constructor(private authService: AuthService) {
    this.user = this.authService.getCurrentUser();
    this.authService.getUserObservable().subscribe(user => {
      this.user = user;
    });
  }

  logout() {
    this.authService.logout();
  }
}
