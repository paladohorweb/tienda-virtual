import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { PedidoComponent } from './pages/pedidos/pedidos.component';
import { PagoComponent } from './pages/pagos/pago.component';
import { ConfirmacionComponent } from './pages/confirmacion/confirmacion.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { AdminUsuariosComponent } from './pages/admin-usuarios/admin-usuarios.component';

export const appRoutes: Routes = [
  { path: 'register', loadComponent: () => import('./pages/auth/register/register.component').then(m => m.RegisterComponent) },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'products', loadComponent: () => import('./pages/products/productos.component').then(m => m.ProductosComponent) },
  { path: 'pedidos', component: PedidoComponent },
  { path: 'cart', loadComponent: () => import('./pages/cart/Carrito.component').then(m => m.CarritoComponent) },
  { path: 'checkout', loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent) },
  { path: 'factura/:pedidoId', loadComponent: () => import('./pages/factura/factura.component').then(m => m.FacturaComponent) },
  { path: 'pago/:pedidoId', component: PagoComponent },
  { path: 'confirmacion/:id', component: ConfirmacionComponent },

  // ✅ Perfil solo para usuarios autenticados
  {
    path: 'perfil',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/perfil/perfil.component').then(m => m.PerfilComponent)
  },

  // ✅ Ruta del panel de administrador protegida con adminGuard
  {
    path: 'admin/productos',
    canActivate: [adminGuard],
    loadComponent: () => import('./pages/admin-productos/admin-productos.component').then(m => m.AdminProductosComponent)
  },
    {
    path: 'admin/usuarios',
    component: AdminUsuariosComponent
  },
{
  path: 'credito',
  loadComponent: () => import('./pages/solicitar-credito/solicitar-credito.component').then(m => m.SolicitarCreditoComponent)
},

{
  path: 'creditos',
  loadComponent: () => import('./pages/creditos/mis-creditos/mis-creditos.component').then(m => m.MisCreditosComponent)
},
{
  path: 'admin/creditos',
  loadComponent: () => import('./pages/admin-creditos/admin-creditos.component').then(m => m.AdminCreditosComponent),
  //canActivate: [authGuard], // si estás usando guardias de autenticación
  canActivate: [adminGuard]
},

  { path: '**', redirectTo: 'home' }
];
