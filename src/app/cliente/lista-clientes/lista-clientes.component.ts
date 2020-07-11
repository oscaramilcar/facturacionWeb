import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  errorMessage = '';

  constructor(
    private clienteService: ClienteService
      ) { }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes(){
    this.clienteService.getClientes().subscribe({
      next: clientes => { this.clientes = clientes },
      error: err => this.errorMessage = err
    })
  }

  deleteCliente(cliente:Cliente):void{
    if(cliente.id == 0){
      this.onSaveComplete();
    }else{
      if(confirm(`Realmente desea eliminar el cliente: ${cliente.nombre}`)){
        this.clienteService.deleteCliente(cliente.id).subscribe({
          next: () => this.onSaveComplete(),
          error: err => this.errorMessage = err
        })
      }
    }
  }
  onSaveComplete(){
    this.getClientes();
  }
}
