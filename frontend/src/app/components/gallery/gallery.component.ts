import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { PhotoService } from '../../services/photo.service';
import { User } from '../../models/user';
import { UserinfoService } from '../../services/userinfo.service';
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {

  currentImage: any;
  user: User;


  constructor(public photoService: PhotoService, private userinfoService: UserinfoService, private activatedRouter: ActivatedRoute) { 
  }

  ngOnInit() {
    this.photoService.loadSaved();

    //para recoger el id del user de la URL
    this.activatedRouter.params.subscribe(params => {
      if (typeof params['id'] !== 'undefined') {
        console.log("params", params);        
        this.user._id = params['id'];
      } else {
        this.user._id = '';
      }
    });
    this.getUser(this.user._id);
  }

  getUser(id: string){
    this.userinfoService.getUser(id)
      .subscribe(res =>{
        this.user = res;
      });
    console.log("User:  " + this.user);

  }

}