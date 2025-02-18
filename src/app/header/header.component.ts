import { Component } from '@angular/core';
import {CartService} from "../services/cart.service";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  cartCount = 0;
  constructor(private cartService: CartService, private authService: AuthService) {
    this.cartService.getCart().subscribe(carts => {
      this.cartCount = carts.length;
    });
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout(); 
    window.location.reload();
  }
}
