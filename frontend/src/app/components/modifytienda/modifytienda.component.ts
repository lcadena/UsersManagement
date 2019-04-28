import { Component, OnInit } from '@angular/core';
import { TiendaService } from "../../services/tienda.service";
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
  lista: Tienda[];

  constructor(private tiendaService: TiendaService, private router: Router, private formBuilder: FormBuilder) {

    this.tiendaForm = this.formBuilder.group({
      name: new FormControl(),
      direccion: new FormControl(),      
      products: new FormControl()
    })
   }


  ngOnInit() {
    //cargas la lista de tiendas
    this.listTiendas()
  }


  listTiendas(){
    console.log("listado de las tiendas")
    this.tiendaService.getTiendas()
      .subscribe(
        res => {
          console.log ("respuesta "+ res);
          this.lista = res["tiendas"];
        })  
  }  

  modify(tienda: Tienda){
    console.log("El tienda a modificar  " + tienda._id)
   this.tiendaService.modifytienda(tienda)
   .subscribe(
     res => {
       console.log("resp de modificar " + res);
     })
 }
}
