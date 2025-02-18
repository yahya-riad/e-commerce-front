import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {map, Observable } from 'rxjs';
import {Product} from "../models/product.model";

@Injectable({ providedIn: 'root' })
export class ProductService {

  constructor(private http: HttpClient) {}

  getProducts(page: number, pageSize: number, sortField: string, sortOrder: string): Observable<Product[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', pageSize.toString())
      .set('sortField', sortField)
      .set('sortOrder', sortOrder);

    return this.http.get<{ content: Product[], totalElements: number }>('/api/products', { params })
      .pipe(map(response => response.content));
  }
}
