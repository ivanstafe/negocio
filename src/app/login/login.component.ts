import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service'; 
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login: { username: string, password: string } = {
    username: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  loginUsuario() {
    this.authService.loginUsuario(this.login).subscribe(
      (datos: any) => {
        if (typeof datos === 'object' && 'resultado' in datos) {
          if (datos['resultado'] == 'OK') {//contiene la respuesta del servidor y verifica si datos es un objeto y si contiene una propiedad llamada 'resultado'
            alert(datos['mensaje']);
            // Llama al método setLoggedIn con true para indicar que el usuario está autenticado.
            this.authService.setLoggedIn(true);
           
            this.router.navigate(['/home']);
          } else {
            alert(datos['mensaje']);
          }
        } else {
          alert('Error en la respuesta del servidor.');
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
      }
    );
  }
}