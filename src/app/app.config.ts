import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductosComponent } from './pages/products/productos.component';
//import { CarritoComponent } from './pages/cart/carrito.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { PedidoComponent } from './pages/pedidos/pedidos.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductosComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'pedidos', component: PedidoComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  { path: '**', redirectTo: '' }
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};

