import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {User} from "../../models/user";
import {UserinfoService} from "../../services/userinfo.service";

import * as io from 'socket.io-client' ;
import * as app from 'express';
import { makeDecorator } from '@angular/core/src/util/decorators';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  
  user: User;  
  socket = io();
  chatForm: FormGroup;
  mensajes: string[] = []

  constructor(private router: Router,private formBuilder: FormBuilder, private activatedRouter: ActivatedRoute, private userinfoService: UserinfoService) {
    this.user = new User("","", "","","","",null)
    this.socket = io.connect("http://localhost:3000"); 

    this.chatForm = this.formBuilder.group({
      message: new FormControl(),
    })

    //escuchar mi socket          
    this.socket.on('envio', function(socket){
      var socketlength = socket.length;
        console.log("mi socket ", socket);
        this.outputList = [];
        this.outputList = socket
        /*for (var i = 0; i <= socketlength-1; i++) {
            //console.log("socket ", socket[i]);
            this.outputList.push(socket[i])
          }*/
    }.bind(this));

    //escucho los mensajes del chat
    this.socket.on('chat', function(mensaje){
      console.log ("mensaje recivido  ", mensaje);
      this.mensajes = mensaje;
    }.bind(this));

   }

  ngOnInit() {
    //para recoger el email de la URL
  this.activatedRouter.params.subscribe(params => {
    if (typeof params['id'] !== 'undefined') {
      console.log("params", params);
      this.user._id = params['id'];      
      
    } else {
      this.user._id= '';
    }
  });  
  this.getUser(this.user._id);
  
  }
  getUser(id:string){
    this.userinfoService.getUser(id)
    .subscribe(res =>{
      this.user = res;
      console.log("Usuario  " + this.user.email) //porque pasa dos veces 
    })
  }

  sendConection(){ //enviar al servidor que me he conectado al chat-socket
  this.socket.emit('user', this.user.email);
  console.log("conexion enviada  " + this.user.email);
  }

  sendChat(){//envio el mensaje al server para que este lo redirecciona
    this.socket.emit('chat', this.user.email, this.chatForm.value.message);
    console.log("chat enviado  " , this.user.email)
    console.log("message enviado  " , this.chatForm.value.message)
  }
}
