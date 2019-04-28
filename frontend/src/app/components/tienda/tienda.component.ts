import { Component, OnInit } from '@angular/core';
import { TiendaService } from "../../services/tienda.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import { Tienda } from '../../models/tienda';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {
  ticketsForm: FormGroup;
  lista: Tienda[];

  constructor(private tiendaService: TiendaService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.listTiendas();
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
}
