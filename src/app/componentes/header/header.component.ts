import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service.ts.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    private location: Location, 
    private authService: AuthService, 
    private router: Router
  ) { }

  goBack() {
    this.location.back();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/bienvenida']);
  }

}
