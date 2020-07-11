import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Factura } from '../models/factura';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

const URL_API = "https://localhost:5001/api";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(
    private http:HttpClient
  ) { }

  getFactura(idcliente:number,idfactura:number):Observable<Factura>{
    return this.http.get<Factura>(`${URL_API}/clientes/${idcliente}/facturas/${idfactura}`).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    )
  }

  createFactura(idcliente:number,factura:Factura):Observable<Factura>{
    return this.http.post<Factura>(`${URL_API}/clientes/${idcliente}/facturas`,JSON.stringify(factura),httpOptions).pipe(
      tap(data => console.log('createFactura '+ JSON.stringify(data))),
      catchError(this.handleError)
    )
  }

  deleteFactura(idcliente:number,idfactura):Observable<Factura>{
    return this.http.delete<Factura>(`${URL_API}/clientes/${idcliente}/facturas/${idfactura}`,httpOptions).pipe(
      tap(data => console.log('deleFactura' + idfactura)),
      catchError(this.handleError)
    )
  }

  private handleError(err){
    let errorMessage:string;
    if(err.error instanceof ErrorEvent){
      errorMessage = `A ocurrido un error: ${err.error.message}`
    }else{
      errorMessage = `codigo backend retornado ${err.status}: ${err.body.error}`
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
