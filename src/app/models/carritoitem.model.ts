export interface CarritoItem {
  producto: {
    id: number;
    nombre: string;
    precio: number;
    imagenUrl?: string;
  };
  cantidad: number;
}

export interface Carrito {
  id: number;
  usuario: {
    id: number;
  };
  items: CarritoItem[];
  total: number;
}
