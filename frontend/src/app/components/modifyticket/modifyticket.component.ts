import { Component, OnInit } from '@angular/core';
import { TicketService } from "../../services/ticket.service";
import {Router, ActivatedRoute} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import { Ticket } from "../../models/ticket";
import { formControlBinding } from '@angular/forms/src/directives/ng_model';

@Component({
  selector: 'app-modifyticket',
  templateUrl: './modifyticket.component.html',
  styleUrls: ['./modifyticket.component.css']
})
export class ModifyticketComponent implements OnInit {

  ticketsForm: FormGroup;
  ticket: Ticket;

  constructor(private ticketService: TicketService, private router: Router, private formBuilder: FormBuilder, private activatedRouter: ActivatedRoute) {
    this.ticket = new Ticket("","", "","",null);
    this.ticketsForm = this.formBuilder.group({
      name: new FormControl(),
      cif: new FormControl(),
      foto: new FormControl(),
      expedicion: new FormControl(),
      products: new FormControl()
    })
   }

  ngOnInit() {
   //para recoger el id de la URL 
   this.activatedRouter.params.subscribe(params => {
    if (typeof params['id'] !== 'undefined') {
      console.log("params", params);
      this.ticket._id = params['id'];
    } else {
      this.ticket._id = '';
    }
  });
  console.log ("info del URL:   " + this.ticket._id);
      this.getTicket(this.ticket._id);
      
  }

  getTicket(id: string){
    console.log("informacion del ticket  " + id)
    this.ticketService.getTicket(id)
      .subscribe(
        res => {
          console.log ("respuesta "+ res);
          this.ticket = res;
        })
  }

  modify(ticket: Ticket){
     console.log("El ticket a modificar  " + ticket._id)
     ticket.name = this.ticketsForm.value.name;
     ticket.cif= this.ticketsForm.value.cif;
     ticket.foto= this.ticketsForm.value.foto;
     //ticket.expedicion= this.ticketsForm.value.expedicion (calendario)
    this.ticketService.modifyticket(ticket)
    .subscribe(
      res => {
        console.log("resp de modificar " + ticket.name);
      })
  }
}
