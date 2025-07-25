import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild('navbarNav', { static: false }) navbarNav!: ElementRef;
  isAuthenticated = false;
  usuario: any = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getAuthStatus().subscribe(status => {
      this.isAuthenticated = status;
      this.usuario = status ? this.authService.getUsuario() : null;
    });
  }

  esAdmin(): boolean {
    return this.usuario?.rol === 'ROLE_ADMIN';
  }

  esUser():boolean {
    return this.usuario?.rol === 'ROLE_USER';
  }

  logout() {
    this.authService.logout();
  }

  toggleNavbar() {
    const navbar = this.navbarNav.nativeElement;
    navbar.classList.toggle('show');
  }

  closeNavbar() {
    this.navbarNav.nativeElement.classList.remove('show');
  }
}
