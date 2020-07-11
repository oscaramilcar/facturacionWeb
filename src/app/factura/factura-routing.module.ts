import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalleFacturaComponent } from './detalle-factura/detalle-factura.component';
import { FormFacturaComponent } from './form-factura/form-factura.component';


const routes: Routes = [
  { component: DetalleFacturaComponent, path:'clientes/:idcliente/facturas/:idfactura' },
  { component: FormFacturaComponent, path:'clientes/:idcliente/facturas-save' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturaRoutingModule { }
