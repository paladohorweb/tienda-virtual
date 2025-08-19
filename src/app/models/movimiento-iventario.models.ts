// src/app/models/movimiento-inventario.model.ts
export type TipoMovimiento = 'ENTRADA' | 'SALIDA' | 'AJUSTE';

export interface MovimientoInventarioRequest {
  productoId: number;
  cantidad: number;   // + para entradas, + para salidas en SALIDA (interpretamos como positivo)
  tipo: TipoMovimiento | null | undefined; 
   motivo?: string | null | undefined;
  usuario?: string;
}

export interface MovimientoInventarioResponse {
  id: number;
  fecha: string; // ISO
 tipo: TipoMovimiento | null | undefined;
  cantidad: number;
 motivo?: string | null | undefined;
  usuario?: string;
  productoId?: number;
  productoNombre?: string;
  stockActual?: number;
}
