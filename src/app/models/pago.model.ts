import { Pedido } from "./pedido.model";


export enum MetodoPago {
  MASTERCARD_DEBITO = 'MASTERCARD_DEBITO',
  MASTERCARD_CREDITO = 'MASTERCARD_CREDITO',
  PAYPAL = 'PAYPAL',
  TRANSFERENCIA_BANCARIA = 'TRANSFERENCIA_BANCARIA'
}

export enum EstadoPago {
  PENDIENTE = 'PENDIENTE',
  COMPLETADO = 'COMPLETADO',
  RECHAZADO = 'RECHAZADO'
}

export interface Pago {
  id?: number;
  pedidoId: number;
  metodoPago: MetodoPago;
  monto: number;
  fechaPago?: string; // LocalDateTime en Java -> string en TS
  estado: EstadoPago;
}
