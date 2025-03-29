import { CarritoItem } from "./carritoitem.model";
import { Usuario } from "./usuario.model";


export interface Carrito {
[x: string]: any;
  id: number;
  usuario: Usuario;
  items: CarritoItem[];
  total: number;
}
