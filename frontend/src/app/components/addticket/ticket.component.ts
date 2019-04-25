import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import { Ticket } from "../../models/ticket";
import { AuthService } from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class AddticketComponent implements OnInit {

  ticketsForm: FormGroup;

  constructor(private ticketService: AuthService, private router: Router, private formBuilder: FormBuilder) {

    this.ticketsForm = this.formBuilder.group({
      name: new FormControl(),
      cif: new FormControl(),
      foto: new FormControl(),
      expedicion: new FormControl(),
      products: new FormControl()
    })
   }

  ngOnInit() {
  }
  addTickets(){
    console.log(this.ticketsForm);
    let ticket = new Ticket(this.ticketsForm.value.name, this.ticketsForm.value.cif, this.ticketsForm.value.foto, this.ticketsForm.value.expedicion, this.ticketsForm.value.products)
    
    this.ticketService.saveTickets(ticket)
      .subscribe(
        res => {
          console.log ("respuesta "+ res);
        })  
  }
}
