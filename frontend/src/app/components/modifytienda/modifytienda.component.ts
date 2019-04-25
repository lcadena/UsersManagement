import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import { Tienda } from '../../models/tienda';

@Component({
  selector: 'app-modifytienda',
  templateUrl: './modifytienda.component.html',
  styleUrls: ['./modifytienda.component.css']
})
/*
api.put('/tienda/:tiendaId', tiendaCtrl.updateTienda)
*/
export class ModifytiendaComponent implements OnInit {

  tiendaForm: FormGroup;
  list: Tienda[];

  constructor(private tiendaService: AuthService, private router: Router, private formBuilder: FormBuilder) {

    this.tiendaForm = this.formBuilder.group({
      name: new FormControl(),
      direccion: new FormControl(),      
      products: new FormControl()
    })
   }


  ngOnInit() {
    //cargas la lista de tiendas
    this.listTienda()
  }


   listTienda(){
    console.log("listado de las tiendas")
    this.tiendaService.getTickets()
      .subscribe(
        res => {
          console.log ("respuesta "+ res);
          this.list = res["tiendas"];
        })
  }  

  modify(tienda: Tienda){
    console.log("El ticket a modificar  " + tienda._id)
   this.tiendaService.modifytienda(tienda)
   .subscribe(
     res => {
       console.log("resp de modificar " + res);
     })
 }
}
