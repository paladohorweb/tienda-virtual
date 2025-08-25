export interface Venta {
  id: number;
  fechaVenta: string;
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
    metodo: string;
    estado: string;
  };
}
