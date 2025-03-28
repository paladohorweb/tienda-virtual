import { Producto } from "./producto.model";


export interface DetallePedido {
  id: number;
  pedidoId: number;
  producto: Producto;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}
