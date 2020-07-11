import { Producto } from "./Producto";

export class ItemFactura{
    id:number;
    cantidad:number = 1;
    producto:Producto;

    public calcularImporte():number{
        return this.cantidad * this.producto.precio;
    }
}