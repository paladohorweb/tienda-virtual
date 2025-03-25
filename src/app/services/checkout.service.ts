import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private apiUrl = 'http://localhost:8080/api/checkout'; // Reemplaza con tu URL real

  constructor(private http: HttpClient) {}

  procesarPago(cartItems: CartItem[]): Observable<any> {
    return this.http.post<any>(this.apiUrl, { items: cartItems });
  }
}

