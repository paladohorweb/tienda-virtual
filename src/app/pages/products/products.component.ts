import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { Modal } from 'bootstrap';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model'; // Importamos la interfaz

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = []; // Almacena los productos obtenidos del backend
  selectedProduct: Product | null = null; // Producto seleccionado para el modal
  private modal: Modal | null = null; // Referencia al modal

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProducts(); // Cargamos los productos al iniciar el componente
  }

  ngAfterViewInit() {
    this.modal = new Modal(document.getElementById('confirmModal')!);
  }

  /** Carga los productos desde el backend */
  private loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Error al obtener productos:', err)
    });
  }

  /** Agrega un producto al carrito */
  addToCart(product: Product) {
    this.cartService.addToCart({ ...product, quantity: 1 });
    this.selectedProduct = product;
    this.modal?.show(); // Mostramos el modal de confirmación
  }

  /** Obtiene la cantidad de un producto en el carrito */
  getQuantity(productId: number): number {
    return this.cartService.getQuantity(productId);
  }

  /** Navega al carrito */
  goToCart() {
    this.modal?.hide(); // Cerramos el modal antes de navegar
    this.router.navigate(['/cart']);
  }
}




