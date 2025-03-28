import { DetallePedido } from "./detallepedido.model";
import { Usuario } from "./usuario.model";


export enum EstadoPedido {
  PENDIENTE = 'PENDIENTE',
  PAGADO = 'PAGADO',
  ENVIADO = 'ENVIADO',
  CANCELADO = 'CANCELADO'
}

export interface Pedido {
  id: number;
  usuario: Usuario;
  fechaPedido: string; // LocalDateTime en Java -> string en TS
  estado: EstadoPedido;
  detalles: DetallePedido[];
  total: number;
}
