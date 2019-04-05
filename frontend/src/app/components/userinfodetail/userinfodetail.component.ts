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
    //this.user = new User();
  }

  ngOnInit() {
    this.activatedRouter.params.subscribe(params => {
      if (typeof params['id'] !== 'undefined') {
        this.user._id = params['id'];
      } else {
        this.user._id = '';
      }
    });
    this.getSingleUser(this.user._id);
  }

  getSingleUser(id: string) {
    this.userinfoService.getSingleUser(id)
      .subscribe(res =>{
        this.user = res["user"];
      });
    console.log(this.user);
  }

  goBack() {
    localStorage.removeItem('token');
  }
}
