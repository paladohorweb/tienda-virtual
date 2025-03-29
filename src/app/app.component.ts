import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from "./pages/auth/login/login.component";
import { FooterComponent } from "./components/footer/footer.component"; // ✅ Importamos el Navbar standalone

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, NavbarComponent, LoginComponent, FooterComponent] // ✅ Lo agregamos en imports
 // ✅ Lo agregamos en imports
 // ✅ Lo agregamos en imports
})
export class AppComponent {
  title = 'tienda virtual';
 }



