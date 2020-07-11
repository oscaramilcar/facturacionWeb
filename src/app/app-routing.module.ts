import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaClientesComponent } from './cliente/lista-clientes/lista-clientes.component';


const routes: Routes = [
  { component:ListaClientesComponent, path:'clientes' },
  { path:'', redirectTo:'clientes', pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
