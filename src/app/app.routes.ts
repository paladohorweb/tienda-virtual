import { LoginComponent } from './pages/auth/login/login.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';

export const appRoutes: Routes = [
  { path:'login', component:LoginComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirige a 'home' por defecto
  { path: 'home', component: HomeComponent }, // Ruta para la página de inicio
  { path: 'products', loadComponent: () => import('./pages/products/productos.component').then(m => m.ProductosComponent) },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'cart', loadComponent: () => import('./pages/cart/Carrito.component').then(m => m.CarritoComponent) }, // Agrega la ruta del carrito
  { path: 'checkout', loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent) }, // ✅ Agrega esta línea
  { path: '**', redirectTo: 'home' } // Manejo de rutas no encontradas
];
