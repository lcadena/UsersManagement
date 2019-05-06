import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";
import { User } from '../../models/user';
import { UserinfoService } from '../../services/userinfo.service';
import { TicketService } from "../../services/ticket.service";
import { Ticket } from "../../models/ticket";
import { TiendaService } from "../../services/tienda.service";
import { Tienda } from "../../models/tienda";
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/product";

@Component({
  selector: 'app-addticket',
  templateUrl: './addticket.component.html',
  styleUrls: ['./addticket.component.css']
})
export class AddticketComponent implements OnInit {

  ticketsForm: FormGroup;
  user: User;
  ticket: Ticket;
  tienda: Tienda;
  product: Product;

  constructor(private userService: UserinfoService,  private tiendaService: TiendaService, 
    private ticketService: TicketService, private productService: ProductService,  private router: Router, private formBuilder: FormBuilder,
    private activatedRouter: ActivatedRoute) {
      this.user = new User("","", "","","","",null);

    this.ticketsForm = this.formBuilder.group({
      name: new FormControl(),
      cif: new FormControl(),
      foto: new FormControl(),
      expedicion: new FormControl(),
      //tienda
      nametienda: new FormControl(),
      direccion: new FormControl(), 
      //producto
      nameproducto: new FormControl(),
      price: new FormControl(),
      category: new FormControl(),
      description: new FormControl(),
    })
   }
  ngOnInit() {
    //para recoger el id del user
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
    this.tienda = new Tienda("",this.ticketsForm.value.nametienda, this.ticketsForm.value.direccion)
    this.product = new Product ("",this.ticketsForm.value.nameproducto, "", this.ticketsForm.value.price, this.ticketsForm.value.category, null, null, this.ticketsForm.value.description)
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
//Añadir tienda         
    this.tiendaService.saveTienda(this.tienda)
      .subscribe(
        (res:Tienda) => {
          console.log ("respuesta " + res);
          this.tienda = res;         
        //añadir tienda a usuario
        let data = {
          "iduser": this.user._id,
          "idtienda": this.tienda._id };
        console.log('data ', data)
        let body = JSON.stringify(data )        
    this.userService.addTiendaToUser(this.user._id, this.tienda._id, body)
      .subscribe(
      res => {
        console.log ("tienda" + res);
        })
      }) 
//Añadir producto
   this.productService.saveProduct(this.product)
    .subscribe(
      (res: Product) => {
        console.log("producto" + res)
        this.product = res;
      })
    this.router.navigateByUrl("api/user/" + this.user._id)
  }

}