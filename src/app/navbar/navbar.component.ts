// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { NavbarService } from '../navbar.service';

// @Component({
//   selector: 'app-navbar',
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.css']
// })
// export class NavbarComponent {
//   constructor(public router: Router, private navbarService: NavbarService) {}

//   // isLoginComponent(): boolean {
//   //   console.log('URL actual:', this.router.url);
//   //   return this.router.url === '/login';
//   // }



//   ngOnInit() {
   
//   }
// }
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router, private authService: AuthService) {}

  logout() {

    this.authService.logout();

    
    this.router.navigate(['/login']);
  }
}
