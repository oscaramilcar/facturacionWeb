import { Component, OnInit } from '@angular/core';
import { FacturaService } from "../factura.service";
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Factura } from 'src/app/models/factura';

@Component({
  selector: 'app-detalle-factura',
  templateUrl: './detalle-factura.component.html',
  styleUrls: ['./detalle-factura.component.css']
})
export class DetalleFacturaComponent implements OnInit {

  private sub:Subscription

  factura:Factura;
  errorMessage = '';

  constructor(
    private facturaService:FacturaService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe(
      params =>{
        const idcliente = +params.get('idcliente');
        const idfactura = +params.get('idfactura');
        this.getcliente(idcliente,idfactura);
      }
    );
  }

  getcliente(idcliente:number,idfactura:number){
    this.facturaService.getFactura(idcliente,idfactura).subscribe({
      next:factura => { this.factura = factura },
      error:err => this.errorMessage = err
    });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
