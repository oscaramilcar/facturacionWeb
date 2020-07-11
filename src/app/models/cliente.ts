import { Factura } from "./factura";

export class Cliente {
    id:number;
    nombre:string;
    apellido:string;
    telefono:string;
    correo:string;
    facturas:Array<Factura> = [];
}
