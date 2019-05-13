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
  actual: Ticket;
  ticket: Ticket;

  constructor(private ticketService: TicketService, private router: Router, 
    private formBuilder: FormBuilder, private activatedRouter: ActivatedRoute) {
    this.actual = new Ticket("","", "","",null);
    this.ticketsForm = this.formBuilder.group({
      name: new FormControl(),
      cif: new FormControl(),
      foto: new FormControl(),
      expedicion: new FormControl(),
      //products: new FormControl()
    })
   }

  ngOnInit() {
   //para recoger el id del ticket de la URL
   this.activatedRouter.params.subscribe(params => {
    if (typeof params['id'] !== 'undefined') {
      console.log("params", params);
      this.actual._id = params['id'];
    } else {
      this.actual._id = '';
    }
  });
      this.getTicketID(this.actual._id)     
  }

  getTicketID(id: string){
    console.log("informacion del ticket  " + id)
    this.ticketService.getTicket(id)
      .subscribe(
        res => {
          console.log ("info del ticket ", res);
          this.actual = res;
        })
    }

  modify(id: string){
    this.ticket = new Ticket(id, this.ticketsForm.value.name, this.ticketsForm.value.cif, this.ticketsForm.value.foto,null,null)
     console.log("El ticket a modificar  ", this.ticket)
    this.ticketService.modifyticket(this.ticket)
    .subscribe(
      res => {
        console.log("resp de modificar ", res);
      })
  }
}
