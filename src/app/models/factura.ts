import { ItemFactura } from "./item-factura";
import { Cliente } from './cliente';

export class Factura {
    id:number;
    descripcion:string;
    CreateAt:string;
    itemsFactura:Array<ItemFactura> = [];
    cliente:Cliente;
    total:number;

    tortalFactura():number{
        this.total = 0;
        this.itemsFactura.forEach((item:ItemFactura) =>{
            this.total += item.calcularImporte();
        });
        return this.total;
    }
}