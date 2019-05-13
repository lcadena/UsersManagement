import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {UserinfoService} from "../../services/userinfo.service";
import {User} from "../../models/user";
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-menulateral',
  templateUrl: './menulateral.component.html',
  styleUrls: ['./menulateral.component.scss'],
})
export class MenulateralComponent implements OnInit {
  user: User;
  constructor(private menu: MenuController, private userinfoService: UserinfoService, private router: Router,
    private activatedRouter: ActivatedRoute ) {
      this.user = new User("","","","","","",null)
   }

  ngOnInit() {
    //para recoger el email de la URL
  this.activatedRouter.params.subscribe(params => {
    if (typeof params['id'] !== 'undefined') {
      console.log("params", params);
      this.user._id = params['id'];      
      console.log("user: ", this.user);
    } else {
      this.user._id = '';
    }
  });
  this.getUser(this.user._id)
  }
  getUser(id:string){
    this.userinfoService.getUser(id)
    .subscribe(res =>{
      this.user = res;
      console.log("Usuario" + this.user._id) //porque pasa dos veces 
    })
  }

/*
  openFirst(){
    console.log("Menu abierto");
    this.menu.enable(true, 'first');
    this.menu.open('first');

  }

  openEnd(){
    this.menu.open('end');
  }

  openCustom(){
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
*/
}
