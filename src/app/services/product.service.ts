import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Producto 1', description: 'Descripción 1', price: 100, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Producto 2', description: 'Descripción 2', price: 200, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Producto 3', description: 'Descripción 3', price: 300, image: 'https://via.placeholder.com/150' }
  ];


  constructor() { }

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }
}
