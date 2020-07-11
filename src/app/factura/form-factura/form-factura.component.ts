import { Component, OnInit } from '@angular/core';
import { Factura } from 'src/app/models/factura';
import { ClienteService } from 'src/app/cliente/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from "../../producto/producto.service";
import { ItemFactura } from 'src/app/models/item-factura';
import { Producto } from 'src/app/models/Producto';
import { FormControl, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, flatMap } from 'rxjs/operators';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FacturaService } from '../factura.service';

@Component({
  selector: 'app-form-factura',
  templateUrl: './form-factura.component.html',
  styleUrls: ['./form-factura.component.css']
})
export class FormFacturaComponent implements OnInit {

  factura: Factura = new Factura();
  data: Producto[] = [];
  errorMessage = '';

  buscarProductoNombre = new FormControl();
  productosFiltrados: Observable<Producto[]>;

  constructor(
    private clienteService: ClienteService,
    private ProductoService: ProductoService,
    private facturaService: FacturaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    var param = this.route.snapshot.paramMap.get('idcliente');
    if (param) {
      const id = +param;
      this.getCliente(id);
    }

    this.productosFiltrados = this.buscarProductoNombre.valueChanges
      .pipe(
        map(value => typeof value === 'string' ? value : value.nombre),
        flatMap(value => value ? this._filter(value) : [])
      );
  }

  private _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();

    return this.ProductoService.getProductos(filterValue);
  }

  getCliente(id: number) {
    this.clienteService.getCliente(id).subscribe({
      next: cliente => this.factura.cliente = cliente,
      error: err => this.errorMessage = err
    })
  }

  mostrarNombre(producto?: Producto): string | undefined {
    return producto ? producto.nombre : undefined;
  }

  productoSeleccionado(event: MatAutocompleteSelectedEvent): void {
    let producto = event.option.value as Producto;

    if (this.itemExiste(producto.id)) {
      this.incrementarCantidad(producto.id);
    } else {
      let item = new ItemFactura();
      item.producto = producto;
      this.factura.itemsFactura.push(item);
    }

    this.buscarProductoNombre.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  actualizarCantidad(id: number, event): void {
    let cantidad: number = event.target.value as number;
    if (cantidad == 0) {
      this.eliminarItem(id);
    }
    this.factura.itemsFactura = this.factura.itemsFactura.map((item: ItemFactura) => {
      if (item.producto.id == id) {
        item.cantidad = cantidad;
      }
      return item;
    });
  }
  itemExiste(id: number): boolean {
    let existe = false;
    this.factura.itemsFactura.forEach((item: ItemFactura) => {
      if (id == item.producto.id) {
        existe = true;
      }
    })
    return existe;
  }
  incrementarCantidad(id: number): void {
    this.factura.itemsFactura = this.factura.itemsFactura.map((item: ItemFactura) => {
      if (item.producto.id == id) {
        ++item.cantidad;
      }
      return item;
    })
  }
  eliminarItem(id: number): void {
    this.factura.itemsFactura = this.factura.itemsFactura.filter((item: ItemFactura) => id !== item.producto.id);
  }
  createFactura(id: number) {
    console.log(id);
  }
  onSaveComplete() {
    this.router.navigate(['/clientes']);
  }
}
