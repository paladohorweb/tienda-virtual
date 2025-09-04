export interface Venta {
  id: number;
  fecha: string;
  total: number;
  usuario: {
    id: number;
    nombre: string;
    email: string;
  };
  pedido: {
    id: number;
    estado: string;
  };
  factura: {
    id: number;
    numero: string;
  };
  pago: {
    id: number;
    fechaPago: string;
    metodo: string;
    estado: string;
  };
}
