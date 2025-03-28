import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class CheckoutComponent implements OnInit {
  carrito: any = { productos: [], total: 0 };

  constructor(private carritoService: CarritoService, private router: Router) {}

  ngOnInit(): void {
    this.carritoService.obtenerCarrito().subscribe({
      next: (carrito) => {
        this.carrito = carrito;
      },
      error: (err) => {
        console.error('❌ Error al obtener el carrito:', err);
      }
    });
  }

  finalizarCompra() {  // 🚀 NUEVO: Método para confirmar la compra
    alert('✅ Compra finalizada con éxito');
    this.router.navigate(['/']);
  }
}

