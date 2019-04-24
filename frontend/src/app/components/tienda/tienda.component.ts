import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import {Router} from "@angular/router";
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Tienda } from "../../models/tienda";

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {

  tiendaForm: FormGroup;

  constructor(private tiendaService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.tiendaForm = this.formBuilder.group({
      name: new FormControl(),
      direccion: new FormControl(),     
      products: new FormControl()
    })

   }

  ngOnInit() {
  }


  addTienda(){
    console.log(this.tiendaForm);
    let tienda = new Tienda(this.tiendaForm.value.name, this.tiendaForm.value.cif, this.tiendaForm.value.products)
    
    this.tiendaService.saveTienda(tienda)
      .subscribe(
        res => {
          console.log ("respuesta "+ res);
        })  
  }
}
