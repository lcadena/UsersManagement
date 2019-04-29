import { Component, OnInit } from '@angular/core';
import { TiendaService } from "../../services/tienda.service";
import {Router, ActivatedRoute} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import { Tienda } from '../../models/tienda';
import { User } from '../../models/user';

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
  tienda: Tienda;
  user: User;

  constructor(private activatedRouter: ActivatedRoute, private tiendaService: TiendaService, private router: Router, private formBuilder: FormBuilder) {
    this.tienda = new Tienda();

    this.tiendaForm = this.formBuilder.group({
      name: new FormControl(),
      direccion: new FormControl(),      
      products: new FormControl()
    })
   }


  ngOnInit() {
  //para recoger el id del user
  this.activatedRouter.params.subscribe(params => {
    if (typeof params['id'] !== 'undefined') {
      console.log("params", params);
      this.tienda._id = params['id'];
    } else {
      this.tienda._id = '';
    }
  });
    //cargas la lista de tiendas
    this.getTiendaID(this.tienda._id)
  }  
  
  getTiendaID(id: string){
    this.tiendaService.getTiendaID(id)
    .subscribe(
      res => {
        console.log("info de una tienda" + res)
        this.tienda = res;
        }
      )}

  modify(tienda: Tienda){
    console.log("El tienda a modificar  " + tienda._id)
    tienda.name = this.tiendaForm.value.name;
    tienda.direccion= this.tiendaForm.value.direccion;
   this.tiendaService.modifytienda(tienda)
   .subscribe(
     res => {
       console.log("resp de modificar " + res);
     })
 }


}
