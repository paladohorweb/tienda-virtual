export interface Producto {


  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagenUrl: string;
  destacado?: boolean;
}

