import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.css']
})
export class FormClienteComponent implements OnInit, OnDestroy {

  clienteForm:FormGroup;
  errorMessage:string;
  cliente:Cliente;
  private sub:Subscription;
  tituloForm = 'Editar cliente';

  constructor(
    private clienteService:ClienteService,
    private fb:FormBuilder,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.clienteForm = this.fb.group({
      nombre:['',[Validators.required]],
      apellido:['',[Validators.required]],
      telefono:['',[Validators.required]],
      correo:['',[Validators.required]]
    })

    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getCliente(id);
      }
    )

  }

  ngOnDestroy():void{
    this.sub.unsubscribe();
  }

  getCliente(id:number):void{
    this.clienteService.getCliente(id).subscribe({
      next:(cliente:Cliente) => this.displayCliente(cliente),
      error: err => this.errorMessage = err
    })
  }

  displayCliente(cliente:Cliente):void{
    if(this.clienteForm){
      this.clienteForm.reset();
    }
    this.cliente = cliente;

    if(this.cliente.id == 0){
      this.tituloForm = 'Nuevo cliente';
    }else{
      this.tituloForm = `Editar cliente: ${this.cliente.nombre}`;
    }

    this.clienteForm.patchValue({
      nombre: this.cliente.nombre,
      apellido: this.cliente.apellido,
      telefono: this.cliente.telefono,
      correo: this.cliente.correo
    });
  }

  saveCliente(){
    if(this.clienteForm.valid){
      if(this.clienteForm.dirty){
        const c = { ...this.cliente, ...this.clienteForm.value };
        if(c.id == 0){
          this.clienteService.createCliente(c).subscribe({
            next:() => this.onSaveComplete(),
            error:err => this.errorMessage = err           
          });
        }else{
          this.clienteService.updateCliente(c).subscribe({
            next:() => this.onSaveComplete(),
            error:err => this.errorMessage = err
          });
        }
      }else{
        this.onSaveComplete();
      }
    }else{
      this.errorMessage = 'Por favor, corrija los errores de validacion.';
    }
  }

  deleteCliente(){
    if(this.cliente.id == 0){
      this.onSaveComplete();
    }else{
      if(confirm(`Realmente desea eliminar el cliente: ${this.cliente.nombre}`)){
        this.clienteService.deleteCliente(this.cliente.id).subscribe({
          next: () => this.onSaveComplete(),
          error: err => this.errorMessage = err
        })
      }
    }
  }

  onSaveComplete(){
    this.clienteForm.reset();
    this.router.navigate(['/clientes']);
  }

}
