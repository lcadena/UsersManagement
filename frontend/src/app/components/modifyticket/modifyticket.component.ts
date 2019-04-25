import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import { Ticket } from "../../models/ticket";

@Component({
  selector: 'app-modifyticket',
  templateUrl: './modifyticket.component.html',
  styleUrls: ['./modifyticket.component.css']
})
export class ModifyticketComponent implements OnInit {

  ticketsForm: FormGroup;
  list: Ticket[];

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
    //al cargar se me listan los tickets
    this.listTickets();
    
  }

  listTickets(){
    console.log("listado de las tickets")
    this.ticketService.getTickets()
      .subscribe(
        res => {
          console.log ("respuesta "+ res);
          this.list = res["tickets"];
        })
  }

  modify(ticket: Ticket){
     console.log("El ticket a modificar  " + ticket._id)
    this.ticketService.modifyticket(ticket)
    .subscribe(
      res => {
        console.log("resp de modificar " + res);
      })
  }
}
