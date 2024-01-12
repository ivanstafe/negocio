// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { map } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   URL = "http://127.0.0.1:80/webServicesPHP-Negocio/";
//   isLoggedIn: boolean = false; 

//   constructor(private http: HttpClient) { }

// //metodo para setear 
//   setLoggedIn(value: boolean) {
//     this.isLoggedIn = value;
//   }

//   loginUsuario(login: { username: string, password: string }) {
//     return this.http.post(`${this.URL}Login.php`, JSON.stringify(login))
//       .pipe(
//         map((response: any) => {
//           if (typeof response === 'object' && 'resultado' in response) {
//             if (response['resultado'] === 'OK') {
//               // Cuando el inicio de sesión tiene éxito, establece el estado de autenticación como true
//               this.setLoggedIn(true);
//             }
//           }
//           return response;
//         })
//       );
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  URL = "http://127.0.0.1:80/webServicesPHP-Negocio/";
  isLoggedIn: boolean = false;
  authToken: string | null = null;
  authenticatedEvent = new Subject<boolean>();
  username: string | null = null; // Agrega una propiedad para el nombre de usuario

  constructor(private http: HttpClient, private router: Router) {}

  setLoggedIn(value: boolean) {
    this.isLoggedIn = value;
    this.authenticatedEvent.next(value);
  }

  getLoggedIn() {
    return this.isLoggedIn;
  }

  setAuthToken(token: string) {
    this.authToken = token;
  }

  setUsername(username: string) {
    this.username = username; // Establece el nombre de usuario
  }

  getUsername() {
    return this.username; // Obtiene el nombre de usuario
  }

  loginUsuario(login: { username: string, password: string }) {
    return this.http.post(`${this.URL}Login.php`, JSON.stringify(login))
      .pipe(
        map((response: any) => {
          if (typeof response === 'object' && 'resultado' in response) {
            if (response['resultado'] === 'OK') {
              this.setLoggedIn(true);
              this.setAuthToken(response['token']);
              this.setUsername(login.username); // Almacena el nombre de usuario
            }
          }
          return response;
        })
      );
  }

  logout() {
    this.authToken = null;
    this.setLoggedIn(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    return this.authenticatedEvent.asObservable();
  }
}
