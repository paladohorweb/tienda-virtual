import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Producto } from '../../models/producto.model';
import { ProductoService } from '../../services/producto.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterModule],
})
export class HomeComponent implements OnInit {
  featuredProducts: Producto[] = [];

  @ViewChild('carousel', { static: false }) carousel!: ElementRef;
masVendidos: Producto[] = [];
  duplicatedProducts: Producto[] = [];
scrollInterval: any;

  constructor(private productoService: ProductoService) {}


  scrollLeft(contenedor: HTMLElement) {
  contenedor.scrollBy({ left: -300, behavior: 'smooth' });
}

scrollRight(contenedor: HTMLElement) {
  contenedor.scrollBy({ left: 300, behavior: 'smooth' });
}

  ngOnInit(): void {
     this.productoService.getMasVendidos().subscribe((data) => {
    //this.masVendidos = data;
    console.log("Más vendidos:", data);
    this.autoScroll();
      this.masVendidos = [...data, ...data]; // duplicación para efecto infinito
    this.startAutoScroll();
  });

    this.productoService.obtenerProductosDestacados().subscribe({
      next: (productos) => (this.featuredProducts = productos),
      error: (err) => console.error('❌ Error cargando destacados:', err),
    });
  }
    scroll(direction: 'left' | 'right') {
  const el = this.carousel.nativeElement;
  const scrollAmount = 220;
  direction === 'left' ? el.scrollBy({ left: -scrollAmount }) : el.scrollBy({ left: scrollAmount });
}

autoScroll() {
  setInterval(() => {
    this.scroll('right');
  }, 3000); // cada 3 segundos
}


 startAutoScroll() {
  this.scrollInterval = setInterval(() => {
    const el = this.carousel.nativeElement;
    const maxScroll = el.scrollWidth / 2;

    if (el.scrollLeft >= maxScroll) {
      el.scrollLeft = 0; // reinicio para efecto infinito
    } else {
      el.scrollBy({ left: 1 });
    }
  }, 20); // Velocidad de scroll
}

pauseScroll() {
  clearInterval(this.scrollInterval);
}

resumeScroll() {
  this.startAutoScroll();
}






  clothingProducts = [
    {
      id: 1,
      name: 'Producto 1',
      description: 'Descripción 1',
      price: 199.99,
      image: 'assets/img/product1.jpg',
    },
    {
      id: 2,
      name: 'Producto 2',
      description: 'Descripción 2',
      price: 299.99,
      image: 'assets/img/product2.jpg',
    },
    {
      id: 3,
      name: 'Producto 3',
      description: 'Descripción 3',
      price: 399.99,
      image: 'assets/img/product3.jpg',
    },
    {
      id: 4,
      name: 'Producto 4',
      description: 'Descripción 4',
      price: 399.99,
      image: 'assets/img/product4.jpg',
    },
    {
      id: 4,
      name: 'Producto 4',
      description: 'Descripción 5',
      price: 399.99,
      image: 'assets/img/product5.jpg',
    },
    {
      id: 4,
      name: 'Producto 4',
      description: 'Descripción 6',
      price: 399.99,
      image: 'assets/img/product6.jpg',
    },
    {
      id: 4,
      name: 'Producto 4',
      description: 'Descripción 7',
      price: 399.99,
      image: 'assets/img/product7.jpg',
    },
    {
      id: 4,
      name: 'Producto 4',
      description: 'Descripción 8',
      price: 399.99,
      image: 'assets/img/product8.jpg',
    },
    {
      id: 4,
      name: 'Producto 4',
      description: 'Descripción 9',
      price: 399.99,
      image: 'assets/img/product9.jpg',
    },
    {
      id: 4,
      name: 'Producto 4',
      description: 'Descripción 10',
      price: 399.99,
      image: 'assets/img/product10.jpg',
    }, // 🔧 corregido "imagen" a "image"
  ];
}
