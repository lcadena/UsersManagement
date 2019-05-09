import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TicketService} from "../../services/ticket.service";
import {ActivatedRoute} from "@angular/router";
import { User } from '../../models/user';
import { Ticket } from '../../models/ticket';

@Component({
  selector: 'app-ticketsuser',
  templateUrl: './ticketsuser.component.html',
  styleUrls: ['./ticketsuser.component.css']
})
export class TicketsuserComponent implements OnInit {
  user: User;
  tickets: Ticket[]

  constructor(private router: Router, private ticketService: TicketService, private activatedRouter: ActivatedRoute) { 
    this.user = new User("","", "","","","",null);
  }

  ngOnInit() {
    //para recoger el id del user
    this.activatedRouter.params.subscribe(params => {
      if (typeof params['id'] !== 'undefined') {
        console.log("params", params);
        console.log("user: ", this.user);
        this.user._id = params['id'];
      } else {
        this.user._id = '';
      }
    });
    console.log ("info del URL:   " + this.user._id);

    this.getTicketsuser(this.user._id);
  }

  getTicketsuser(id: string){
    this.ticketService.getTicketsUser(id)
      .subscribe(res =>{
        this.tickets = res;
      });
    console.log("lista de ticket del usuario  " + this.tickets);
  }

  getUser(){
    
  }

}
