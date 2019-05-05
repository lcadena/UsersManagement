import { Component, OnInit } from '@angular/core';

import {Ticket} from './ticket.model';
import { TicketsService } from './tickets.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
})
export class TicketsPage implements OnInit {
  tickets: Ticket[];

  constructor(private ticketsService: TicketsService) {
  }

  ngOnInit() {
    this.tickets = this.ticketsService.getAllTickets();

  }

}
