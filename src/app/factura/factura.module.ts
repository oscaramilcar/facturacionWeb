import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturaRoutingModule } from './factura-routing.module';
import { DetalleFacturaComponent } from './detalle-factura/detalle-factura.component';
import { FormFacturaComponent } from './form-factura/form-factura.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [DetalleFacturaComponent, FormFacturaComponent],
  imports: [
    CommonModule,
    SharedModule,
    FacturaRoutingModule
  ]
})
export class FacturaModule { }
