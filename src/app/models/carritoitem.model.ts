import { Producto } from "./producto.model";


export interface CarritoItem {
  id: number;
  carritoId: number;
  producto: Producto;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}
