import { Injectable } from '@angular/core';
import { Ticket } from './ticket.model';


@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private tickets: Ticket[] = [
    {
      id: 't1',
      title: 'ticket1',
      imageUrl: '',
      products: ['Apple', 'Salad']
    },
    {
      id: 't2',
      title: 'ticket2',
      imageUrl: '',
      products: ['Chips', 'Mango']
    }
  ];

  constructor() { }

  getAllTickets(){
    return [...this.tickets];
  }

  getTicket(ticketId: string) {
    return {
      ...this.tickets.find(ticket => {
        return ticket.id === ticketId;
    })
  };
}
  deleteTicket(ticketId: string){
    this.tickets = this.tickets.filter(ticket => {
      return ticket.id !== ticketId;
    });
  }

}
