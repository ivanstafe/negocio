import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false; // Inicialmente, el usuario no está autenticado

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.getLoggedIn();
    
    this.authService.isAuthenticated().subscribe((auth) => {
      this.isLoggedIn = auth;
    });
  }
}
