import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.component.html',

})
export class PerfilComponent implements OnInit {
  totalProductos = 0;
  totalUsuarios = 0;
  totalPedidos = 0;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getTotalProductos().subscribe(res => this.totalProductos = res);
    this.adminService.getTotalUsuarios().subscribe(res => this.totalUsuarios = res);
    this.adminService.getTotalPedidos().subscribe(res => this.totalPedidos = res);
  }
}
