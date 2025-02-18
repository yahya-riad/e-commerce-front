import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: 'product-list.component.html',
  styleUrls: ['product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  pageSize: number = 10;
  currentPage: number = 0;
  totalProducts: number = 0;
  sortField: string = 'name';
  sortOrder: string = 'asc';

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // Charger les produits avec pagination et tri
  loadProducts() {
    this.productService.getProducts(this.currentPage, this.pageSize, this.sortField, this.sortOrder)
      .subscribe(data => {
        this.products = data;
      });
  }

  // Gérer la pagination
  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadProducts();
  }

  // Ajouter au panier
  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
