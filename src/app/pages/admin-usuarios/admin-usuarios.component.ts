import { Component, OnInit } from '@angular/core';
import { AdminUsuarioService, UsuarioAdmin } from '../../services/admin-usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AdminUsuariosComponent implements OnInit {
  usuarios: UsuarioAdmin[] = [];

  constructor(private usuarioService: AdminUsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.listar().subscribe({
      next: (res) => this.usuarios = res,
      error: (err) => console.error('❌ Error cargando usuarios:', err)
    });
  }

  actualizar(usuario: UsuarioAdmin): void {
    this.usuarioService.actualizar(usuario).subscribe({
      next: () => alert('✅ Usuario actualizado'),
      error: () => alert('❌ Error al actualizar')
    });
  }
}

