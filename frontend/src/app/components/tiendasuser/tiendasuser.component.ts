import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TiendaService} from "../../services/tienda.service";
import { UserinfoService } from '../../services/userinfo.service';
import {ActivatedRoute} from "@angular/router";
import { User } from '../../models/user';
import { Tienda } from '../../models/tienda';

@Component({
  selector: 'app-tiendasuser',
  templateUrl: './tiendasuser.component.html',
  styleUrls: ['./tiendasuser.component.css']
})
export class TiendasuserComponent implements OnInit {
  user: User;
  tiendas: Tienda[];

  constructor(private userinfoService: UserinfoService, private router: Router, private tiendaService: TiendaService, private activatedRouter: ActivatedRoute) { 
    this.user = new User("","", "","","","",null); }

  ngOnInit() {
 //para recoger el id del user
 this.activatedRouter.params.subscribe(params => {
  if (typeof params['id'] !== 'undefined') {
    console.log("params", params);
    console.log("user: ", this.user);
    this.user._id = params['id'];
  } else {
    this.user._id = '';
  }
});
console.log ("info del URL:   " + this.user._id);

this.getTiendasuser(this.user._id);
this.getUser(this.user._id)
}

getTiendasuser(id: string){
this.tiendaService.getTiendasUser(id)
  .subscribe(res =>{
    this.tiendas = res;
  });
console.log("lista de tiendas del usuario  " + this.tiendas);
}
getUser(id:string){
  this.userinfoService.getUser(id)
  .subscribe(res =>{
    this.user = res;
    console.log("Usuario" + this.user._id) //porque pasa dos veces 
  })
}
}
