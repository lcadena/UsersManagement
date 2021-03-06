import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TicketService} from "../../services/ticket.service";
import {UserinfoService} from "../../services/userinfo.service"
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
  tickets: Ticket[];

  constructor(private router: Router, private ticketService: TicketService, 
    private activatedRouter: ActivatedRoute, private userinfoService: UserinfoService) { 
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

    
    this.getUser(this.user._id);
  }

  getTicketsuser(id: string){
    this.ticketService.getTicketsUser(id)
      .subscribe(res =>{
        this.tickets = res;
        console.log("lista de ticket del usuario  ", res);
      });
    
  }

  getUser(id:string){
    this.userinfoService.getUser(id)
    .subscribe(res =>{
      this.user = res;
      console.log("Usuario" + this.user._id) //porque pasa dos veces 
      this.getTicketsuser(this.user._id);
    })
  }

  deleteTicket(ticket){

    let index = this.tickets.indexOf(ticket);

    if(index > -1){
        this.tickets.splice(index, 1);
    }
}
}
