export interface Credito {
  id?: number;
  montoSolicitado: number;
  montoFinal?: number;
  cuotas: number;
  interes?: number;
  estado?: 'PENDIENTE' | 'APROBADO' | 'RECHAZADO';
  fechaSolicitud?: string;
  fechaAprobacion?: string;
  producto: {
    id: number;
    nombre: string;
  };
  usuario?: {
    id: number;
    nombre?: string;
    email?: string;
  };
   pedidoId?: number;
}

