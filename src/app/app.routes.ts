import { LoginComponent } from './pages/auth/login/login.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PedidoComponent } from './pages/pedidos/pedidos.component';
import { PagoComponent } from './pages/pagos/pago.component';
import { ConfirmacionComponent } from './pages/confirmacion/confirmacion.component';
import { adminGuard } from './guards/admin.guard';
import { authGuard } from './guards/auth.guard';

export const appRoutes: Routes = [
  {
  path: 'register',
  loadComponent: () => import('./pages/auth/register/register.component').then(m => m.RegisterComponent)
},
  { path:'login', component:LoginComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirige a 'home' por defecto
  { path: 'home', component: HomeComponent }, // Ruta para la página de inicio
  { path: 'products', loadComponent: () => import('./pages/products/productos.component').then(m => m.ProductosComponent) },
  { path: 'pedidos', component: PedidoComponent },
  { path: 'cart', loadComponent: () => import('./pages/cart/Carrito.component').then(m => m.CarritoComponent) }, // Agrega la ruta del carrito
  { path: 'checkout', loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent) }, // ✅ Agrega esta línea
  {
  path: 'factura/:pedidoId',
  loadComponent: () => import('./pages/factura/factura.component').then(m => m.FacturaComponent)
},
  {
    path: 'pago/:pedidoId',
    component: PagoComponent,
  },{
    path: 'confirmacion/:id',
    component: ConfirmacionComponent
  },
  { path: '**', redirectTo: 'home' } // Manejo de rutas no encontradas
  ,
{
  path: 'perfil',
  canActivate: [adminGuard], // ya lo creamos
  loadComponent: () => import('./pages/perfil/perfil.component').then(m => m.PerfilComponent)
},
{
  path: 'perfil',
  loadComponent: () => import('./pages/perfil/perfil.component').then(m => m.PerfilComponent),
  canActivate: [authGuard]  // Protege esta ruta solo para usuarios logueados
},
{
  path: 'admin/productos',
  canActivate: [adminGuard],
  loadComponent: () => import('./pages/admin-productos/admin-productos.component').then(m => m.AdminProductosComponent)
}
];
