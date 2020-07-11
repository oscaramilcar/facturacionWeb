import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FormClienteComponent } from './form-cliente/form-cliente.component';

@Injectable({
  providedIn: 'root'
})
export class FormClienteGuard implements CanDeactivate<FormClienteComponent> {
  canDeactivate(component:FormClienteComponent): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(component.clienteForm.dirty){
      const nombre = component.clienteForm.get('nombre').value || 'Nuevo cliente';
      return confirm(`¿Esta seguro de abandonar la pagina perdera todos los cambios en: ${nombre}?`)
    }
    return true;
  }
  
}
