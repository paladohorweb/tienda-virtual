import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditoService } from '../../../services/credito.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-mis-creditos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-creditos.component.html'
})
export class MisCreditosComponent implements OnInit {
  creditos: any[] = [];
  cargando = false;
  error: string | null = null;

  constructor(
    private creditoService: CreditoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUsuarioId();
    if (userId === null) {
      this.error = 'Debes iniciar sesión para ver tus créditos';
      return;
    }

    this.cargando = true;
    this.creditoService.listarPorUsuario(userId).subscribe({
      next: (res) => {
        this.creditos = res;
        this.cargando = false;
      },
      error: (err) => {
        console.error('❌ Error al cargar créditos:', err);
        this.error = 'No se pudieron cargar los créditos';
        this.cargando = false;
      }
    });
  }
}

