import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user";
import { Environment } from "./environment";
import { Ticket } from '../models/ticket';
import { Tienda } from '../models/tienda';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  environment: Environment;
  selectedUser: User;

  constructor(private http: HttpClient) {
    this.selectedUser = new User("","","","","","", null);
    this.environment = new Environment();
  }

  signup(user: User) {
    return this.http.post(this.environment.urlUser + "signup", user)
  }

  signin(user: User)  {
    return this.http.post(this.environment.urlUser + "signin", user)
  }


  // servicios de los tickets y las tiendas (hacer otro servicio)

  saveTickets(ticket: Ticket) {
    return this.http.post(this.environment.urlTicket, ticket)
  }

  saveTienda(tienda: Tienda) {
    return this.http.post(this.environment.urlTienda, tienda)
  }

  getTickets():Observable<Ticket>{
    return this.http.get<Ticket>(this.environment.urlUser + "tickets")
  }

  modifyticket(ticket: Ticket){
    
    return this.http.put(this.environment.urlTicket + `/${ticket._id}`)
  }
  modifytienda(tienda: Tienda){
    return this.http.put(this.environment.urlTienda + `/${tienda._id}` )
  }
}
