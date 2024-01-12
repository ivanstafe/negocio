
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  nombreUsuario: string | null = null; // Inicializado como null

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.nombreUsuario = this.authService.getUsername(); // Obtiene el nombre de usuario del servicio
  }
}
