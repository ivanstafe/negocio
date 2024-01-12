// navbar.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private isNavbarVisible = new BehaviorSubject<boolean>(true);

  constructor() {}

  getNavbarVisibility(): Observable<boolean> {
    return this.isNavbarVisible.asObservable();
  }

  showNavbar() {
    this.isNavbarVisible.next(true);
  }

  hideNavbar() {
    this.isNavbarVisible.next(false);
  }
}
