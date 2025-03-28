import { Pedido } from "./pedido.model";

export interface Usuario {
  id: number;
  email: string;
  password: string;
  rol: Rol;
  pedidos?: Pedido[]; // Opcional para evitar posibles errores si no se cargan los pedidos
}

export enum Rol {
  ADMIN = 'ADMIN',
  CLIENTE = 'CLIENTE',
}
