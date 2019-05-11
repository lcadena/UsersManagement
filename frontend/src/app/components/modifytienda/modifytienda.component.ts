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

export class ModifytiendaComponent implements OnInit {

  tiendaForm: FormGroup;
  actual: Tienda;
  tienda: Tienda;

  constructor(private activatedRouter: ActivatedRoute, private tiendaService: TiendaService, 
    private router: Router, private formBuilder: FormBuilder) {
    this.actual = new Tienda("","","",null)  
    this.tiendaForm = this.formBuilder.group({
      name: new FormControl(),
      direccion: new FormControl(),      
      //products: new FormControl()
    })
   }

  ngOnInit() {
  //para recoger el id de la tienda del URL 
  this.activatedRouter.params.subscribe(params => {
    if (typeof params['id'] !== 'undefined') {
      console.log("params", params);
      this.actual._id = params['id'];
    } else {
      this.actual._id = '';
    }
  });
    this.getTiendaID(this.actual._id)
  }  
  
  getTiendaID(id: string){
    this.tiendaService.getTiendaID(id)
    .subscribe(
      res => {
        console.log("info de una tienda",  res)
        this.actual = res;
        })
    } 


  modify(id: string){
    this.tienda = new Tienda(id, this.tiendaForm.value.name, this.tiendaForm.value.direccion, null );
    console.log("La tienda a modificar  ", this.tienda)
   this.tiendaService.modifytienda(this.tienda)
   .subscribe(
     res => {
       console.log("resp de modificar ", res);
     })
 }
}
