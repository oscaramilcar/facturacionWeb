import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError, of } from 'rxjs';
import { Cliente } from "../models/cliente";
import { tap, catchError, map } from "rxjs/operators";

const URL_API = "https://localhost:5001/api";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private http:HttpClient
  ) { }

  getClientes():Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${URL_API}/clientes`).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    )
  }

  getCliente(id:number):Observable<Cliente>{
    if(id === 0){
      return of(this.InitializeCliente());
    }
    return this.http.get<Cliente>(`${URL_API}/clientes/${id}`).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    )
  }

  createCliente(cliente:Cliente):Observable<Cliente>{
    cliente.id = null;
    return this.http.post<Cliente>(`${URL_API}/clientes`,cliente,httpOptions).pipe(
      tap(data => console.log('createCliente: '+ JSON.stringify(data))),
      catchError(this.handleError)
    )
  }

  updateCliente(cliente:Cliente):Observable<Cliente>{
    return this.http.put<Cliente>(`${URL_API}/clientes/${cliente.id}`,cliente,httpOptions).pipe(
      tap(() => console.log('updateCliente ' + cliente.id)),
      map(() => cliente),
      catchError(this.handleError)
    )
  }

  deleteCliente(id:number):Observable<Cliente>{
    return this.http.delete<Cliente>(`${URL_API}/clientes/${id}`,httpOptions).pipe(
      tap(data => console.log('deleCliente' + id)),
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

  private InitializeCliente():Cliente{
    return {
      id:0,
      nombre:null,
      apellido:null,
      telefono:null,
      correo:null,
      facturas:[]
    }
  }
}
