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
    selector: 'app-addtienda',
    templateUrl: './addtienda.component.html',
    styleUrls: ['./addtienda.component.css']
})
export class AddtiendaComponent implements OnInit {
    tiendaForm: FormGroup;
  user: User;
  ticket: Ticket;
  tienda: Tienda;
  product: Product;
    constructor(private userService: UserinfoService,  private tiendaService: TiendaService, 
        private ticketService: TicketService, private productService: ProductService,  private router: Router, private formBuilder: FormBuilder,
        private activatedRouter: ActivatedRoute) {
            this.user = new User("","", "","","","",null);

            this.tiendaForm = this.formBuilder.group({
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

    addTienda(){
        this.tienda = new Tienda("",this.tiendaForm.value.nametienda, this.tiendaForm.value.direccion)
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
    }
}