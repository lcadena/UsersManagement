import { Injectable } from '@angular/core';
import { Tienda } from '../models/tienda';
import { Environment } from "./environment";
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TiendaService {
  environment: Environment;

  constructor(private http: HttpClient) { 
    this.environment = new Environment();
  }
  

  saveTienda(tienda: Tienda) {
    return this.http.post(this.environment.urlTienda, tienda)
  }

  
  getTiendas():Observable<Tienda>{
    return this.http.get<Tienda>(this.environment.urlUser + "tiendas")
  }

  
  modifytienda(tienda: Tienda){
   return this.http.put(this.environment.urlTienda + `/${tienda._id}`, tienda)
  }
}
