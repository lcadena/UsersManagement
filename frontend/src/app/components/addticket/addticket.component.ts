import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";
import { User } from '../../models/user';
import { UserinfoService } from '../../services/userinfo.service';
import { TicketService } from "../../services/ticket.service";
import { Ticket } from "../../models/ticket";

@Component({
  selector: 'app-addticket',
  templateUrl: './addticket.component.html',
  styleUrls: ['./addticket.component.css']
})
export class AddticketComponent implements OnInit {

  ticketsForm: FormGroup;
  user: User;
  ticket: Ticket;
  

  constructor(private userService: UserinfoService,private ticketService: TicketService,  private router: Router, private formBuilder: FormBuilder,
    private activatedRouter: ActivatedRoute) {
      this.user = new User("","", "","","","",null);

    this.ticketsForm = this.formBuilder.group({
      name: new FormControl(),
      cif: new FormControl(),
      foto: new FormControl(),
      expedicion: new FormControl(),
    })
   }
  ngOnInit() {
    //para recoger el id del user de la URL
    this.activatedRouter.params.subscribe(params => {
      if (typeof params['id'] !== 'undefined') {
        console.log("params", params);        
        this.user._id = params['id'];
      } else {
        this.user._id = '';
      }
    });
  }
  
  addTickets(){
    this.ticket = new Ticket("",this.ticketsForm.value.name, this.ticketsForm.value.cif, this.ticketsForm.value.foto, this.ticketsForm.value.expedicion, this.ticketsForm.value.products)
       
//Añadir ticket
    this.ticketService.saveTickets(this.ticket)
      .subscribe(
        (res:Ticket)  => {
          console.log ("respuesta "+ res);         
          this.ticket = res;
          //añadir el ticket al usuario
          let data = {
            "iduser": this.user._id,
            "idticket": this.ticket._id };
          console.log('data ', data)
          let body = JSON.stringify(data )
          this.userService.addTicketToUser(this.user._id , this.ticket._id, body)
          .subscribe(
            res => {      
           console.log ("ticket" + res);
          })
        })

    
  }

}