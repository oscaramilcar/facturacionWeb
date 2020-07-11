import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.component.html',
  styleUrls: ['./detalle-cliente.component.css']
})
export class DetalleClienteComponent implements OnInit {

  cliente:Cliente | undefined;
  errorMessage = '';
  pageTitle = 'Detalle de cliente';

  constructor(
    private clienteService:ClienteService,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    var param = this.route.snapshot.paramMap.get('id');
    if(param){
      const id =+param;
      this.getcliente(id);
    }
  }

  getcliente(id:number){
    this.clienteService.getCliente(id).subscribe({
      next:cliente => { this.cliente = cliente },
      error:err => this.errorMessage = err
    });
  }

  onBack():void{
    this.router.navigate(['/clientes']);
  }

}
