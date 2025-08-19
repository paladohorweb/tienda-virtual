import { FacturaDetalleDto } from './factura-detalle.dto';

export interface FacturaDto {
  id: number;
  numero: string;
  fechaEmision: string; // ISO String desde el backend
  cliente: string; // nombre del usuario
  pedidoId:number;
  total: number;
  iva: number;
  metodoPago: string;
  detalles: FacturaDetalleDto[];
}
