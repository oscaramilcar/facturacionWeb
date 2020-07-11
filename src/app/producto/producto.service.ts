import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/Producto';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

const URL_API = "https://localhost:5001/api";

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(
    private http:HttpClient
  ) { }

  getProductos(nomProducto?:string):Observable<Producto[]>{
    return this.http.get<Producto[]>(`${URL_API}/productos?nombre=${nomProducto}`).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.HandleError)
    )
  }

  private HandleError(err){
    let errorMessage:string;
    if(err.error instanceof ErrorEvent){
      errorMessage = `A ocurrido un error ${err.error.message}`
    }else{
      errorMessage = `Codigo backend retornado ${err.status}: ${err.body.error}`
    }
    console.error(err)
    return throwError(errorMessage);
  }

}
