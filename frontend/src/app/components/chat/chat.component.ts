import { Component, OnInit, Injectable } from '@angular/core';
import { FormsModule, EmailValidator } from '@angular/forms';
import * as io from 'socket.io-client' ;
import * as app from 'express';
//import { Socket } from 'dgram';
import { UserinfoService } from '../../services/userinfo.service'
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
//var parser = require('socket.io-parser');
var socket = io();

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})

export class ChatComponent implements OnInit {
  
  user: User;
  socket: SocketIOClient.Socket;
  
  constructor(private activatedRouter: ActivatedRoute, private userinfoService: UserinfoService) {
   this.socket = io.connect('http://localhost:8100')
    this.user = new User ("","","","","","",null)
    
   }  

  ngOnInit() {
    this.activatedRouter.params.subscribe(params => {
      if (typeof params['id'] !== 'undefined') {
        console.log("params" +  params);
        this.user._id = params['id'];
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
      });
    console.log(this.user);
  }

  sendChat(message: string){
    console.log("email" + this.user.email)
    console.log("mensage" + message)
    //this.socket.emit("chat", message, this.user.email);
  }
}
