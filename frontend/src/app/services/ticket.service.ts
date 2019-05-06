import { Injectable } from '@angular/core';
import { Environment } from './environment';
import { Ticket } from '../models/ticket';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  environment: Environment;

  constructor(private http: HttpClient) {
    this.environment = new Environment();
   }

   saveTickets(ticket: Ticket) {
    return this.http.post(this.environment.urlTicket, ticket);
  }
  getTickets(): Observable<Ticket> {
    return this.http.get<Ticket>(this.environment.urlUser + 'tickets' );
  }

  modifyticket(ticket: Ticket) {
    return this.http.put(this.environment.urlTicket + `/${ticket._id}`, ticket);
  }

  getTicketsUser(_id: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.environment.urlUser + 'tickets' + `/${_id}` );

  }

}

