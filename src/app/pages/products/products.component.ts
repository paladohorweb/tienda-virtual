import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
// Importamos Bootstrap
import { Modal } from 'bootstrap';
import { Router } from '@angular/router'; // Importamos Router

// Definir la estructura de un producto
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[] = [
    {
      id: 1,
      name: 'Laptop Gamer',
      price: 1500,
      image: 'assets/laptop.jpg',
      description: 'Laptop potente para gaming y trabajo.'
    },
    {
      id: 2,
      name: 'Teclado Mecánico',
      price: 80,
      image: 'assets/keyboard.jpg',
      description: 'Teclado mecánico RGB con switches azules.'
    },
    {
      id: 3,
      name: 'Mouse Inalámbrico',
      price: 50,
      image: 'assets/mouse.jpg',
      description: 'Mouse ergonómico inalámbrico con sensor óptico.'
    }
  ];




  selectedProduct: Product | null = null; // Producto seleccionado
  private modal: Modal | null = null; // Referencia al modal


  constructor(private cartService: CartService, private router: Router) {}

  ngAfterViewInit() {
    this.modal = new Modal(document.getElementById('confirmModal')!);
  }

  addToCart(product: Product) {
    this.cartService.addToCart({ ...product, quantity: 1 });
    this.selectedProduct = product;
    this.modal?.show(); // Mostramos el modal
  }


  getQuantity(productId: number): number {
    return this.cartService.getQuantity(productId);
  }

  goToCart() {
    this.modal?.hide(); // Cerramos el modal antes de navegar
    this.router.navigate(['/cart']);
  }
}



