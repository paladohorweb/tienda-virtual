import { LoginComponent } from './pages/auth/login/login.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const appRoutes: Routes = [
  { path:'login', component:LoginComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirige a 'home' por defecto
  { path: 'home', component: HomeComponent }, // Ruta para la página de inicio
  { path: 'products', loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent) },
  { path: 'cart', loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent) }, // Agrega la ruta del carrito
  { path: '**', redirectTo: 'home' } // Manejo de rutas no encontradas
];
