import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true, // ✅ Ahora es un componente standalone
  imports: [CommonModule, RouterModule], // ✅ Importamos los módulos necesarios
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @ViewChild('navbarNav', { static: false }) navbarNav!: ElementRef;
  isAuthenticated = false;
  usuario: any = null;


  constructor(private authService: AuthService) {
    this.authService.getAuthStatus().subscribe(status => {
      this.isAuthenticated = status;
       this.usuario = status ? this.authService.getUsuario() : null;
    });
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



