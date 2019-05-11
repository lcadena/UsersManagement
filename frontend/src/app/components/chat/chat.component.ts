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
  mensajes: string[] = [];
  lista: string[]=[]; //lista de socke + email de cada uno de los usuarios conectados al chat
  lista2:string[]=[]; //lista del socket y el email separados
  outputlist: string[] = [];
  emaildestino: string ="";
  socketdestino: string;
  listaconectados: string[] = [];
  
  

  constructor(private router: Router,private formBuilder: FormBuilder, private activatedRouter: ActivatedRoute, private userinfoService: UserinfoService) {
    this.user = new User("","", "","","","",null)
    this.socket = io.connect("http://localhost:3000");

    this.chatForm = this.formBuilder.group({
      message: new FormControl(),
    })

    //escuchar evontos que recive mi socket        
    this.socket.on('envio', function(socket){
        console.log("lista de socket ", socket);
        //romper la cadena 
        this.outputlist = [];
        this.listaconectados = [];  
        this.lista =socket.split(",");
        for (var i=0; i< this.lista.length-1; i++){
          console.log("Los usuarios conectados  ",this.lista[i]);
          this.lista2 = this.lista[i].split("+");       
           
          for(var j=0; j<this.lista2.length; j=j+2){   //el j el socket y en j+1 el email            
            if(this.lista2[j+1].value != "" ) {//si no esta definido no mostrar   ¡¡NO-FUNCIONA  y si soy yo tampoco          
            this.outputlist.push(this.lista2[j+1]);
            this.listaconectados.push(this.lista2[j]);
            this.listaconectados.push(this.lista2[j+1]);
            }
          }                
        }        
       console.log("lista de conectados", this.listaconectados);
    }.bind(this));

    //escucho los mensajes del chat
    this.socket.on('chat', function(mensaje, dest){
      if (dest == this.socket.id){
        console.log ("mensaje recibido  ", mensaje);
        this.mensajes.push(mensaje); //cuando me centre en una hay que romperlo
      }   
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

  sendTo(email: string){ //para elieguir a quien enviar   
   this.emaildestino = email;
   this.socketdestino = "";
   this.mensajes = [];
    console.log("email:  " + email +"   form:   "+  this.emaildestino)
    for(let k=1; k<this.listaconectados.length; k++){
      if (this.listaconectados[k] == this.emaildestino){
      this.socketdestino = this.listaconectados[k-1];
      console.log("el socket de destino  ", this.socketdestino)
      }
    }
  }
  sendChat(){//envio el mensaje al server para que este lo redirecciona     
    this.socket.emit('chat', this.user.email, this.socketdestino, this.chatForm.value.message); 
    console.log("email de :  " , this.user.email)
    console.log("para(socket)   ", this.socketdestino)
    console.log("message enviado:  " , this.chatForm.value.message)
  }
}
