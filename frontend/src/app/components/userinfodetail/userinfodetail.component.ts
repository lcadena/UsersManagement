import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserinfoService} from "../../services/userinfo.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-userinfodetail',
  templateUrl: './userinfodetail.component.html',
  styleUrls: ['./userinfodetail.component.css']
})
export class UserinfodetailComponent implements OnInit {

  user: User;

  constructor(private activatedRouter: ActivatedRoute, private userinfoService: UserinfoService) {
    this.user = new User("","", "","","","",null);
  }

  ngOnInit() {
    this.activatedRouter.params.subscribe(params => {
      if (typeof params['id'] !== 'undefined') {
        console.log("params", params);
        console.log("user: ", this.user);
        this.user._id = params['id'];
      } else {
        this.user._id = '';
      }
    });
    this.getUser(this.user._id);
  }

  getUser(id: string) {
    this.userinfoService.getUser(id)
      .subscribe(res =>{
        this.user = res["user"];
      });
    console.log(this.user);
  }

  goBack() {
    localStorage.removeItem('token');
  }
}
