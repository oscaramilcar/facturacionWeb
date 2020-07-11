import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { SharedModule } from "../shared/shared.module";
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { FormClienteComponent } from './form-cliente/form-cliente.component';
import { DetalleClienteComponent } from './detalle-cliente/detalle-cliente.component';

@NgModule({
  declarations: [
    ListaClientesComponent,
    FormClienteComponent,
    DetalleClienteComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClienteRoutingModule
  ]
})
export class ClienteModule { }
