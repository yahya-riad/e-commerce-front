import {Component, OnInit} from '@angular/core';
import { CartService } from '../services/cart.service';
import {Product} from "../models/product.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  cartItems$: Observable<Product[]> | undefined;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems$ = this.cartService.getCart();
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

}


