import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditoService } from '../../services/credito.service';
import { Credito } from '../../models/credito.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-creditos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-creditos.component.html'
})
export class AdminCreditosComponent implements OnInit {
  creditos: Credito[] = [];
  cargando = false;
  mensaje: string = '';
  error: string | null = null;

  constructor(private creditoService: CreditoService) {}

  ngOnInit(): void {
    this.cargarCreditos();
  }

  cargarCreditos(): void {
    this.cargando = true;
    this.creditoService.listarTodos().subscribe({
      next: (data) => {
        this.creditos = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('❌ Error al cargar créditos:', err);
        this.error = 'Error al cargar solicitudes de crédito';
        this.cargando = false;
      }
    });
  }

  aprobar(id: number): void {
    this.creditoService.aprobarCredito(id).subscribe({
      next: () => {
        this.mensaje = '✅ Crédito aprobado';
        this.cargarCreditos();
      },
      error: () => {
        this.mensaje = '❌ Error al aprobar el crédito';
      }
    });
  }

  rechazar(id: number): void {
    this.creditoService.rechazarCredito(id).subscribe({
      next: () => {
        this.mensaje = '🚫 Crédito rechazado';
        this.cargarCreditos();
      },
      error: () => {
        this.mensaje = '❌ Error al rechazar el crédito';
      }
    });
  }
}

