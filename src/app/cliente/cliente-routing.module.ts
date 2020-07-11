import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormClienteComponent } from './form-cliente/form-cliente.component';
import { DetalleClienteComponent } from "./detalle-cliente/detalle-cliente.component";
import { FormClienteGuard } from './form-cliente.guard';


const routes: Routes = [
  { component:FormClienteComponent, path:'clientes/:id/save' , canDeactivate:[FormClienteGuard]},
  { component:DetalleClienteComponent, path:'clientes/:id/facturas' }
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
