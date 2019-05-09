import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {UserinfoService} from "../../services/userinfo.service";
import {User} from "../../models/user";

import * as io from 'socket.io-client' ;
import * as app from 'express'

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {
  socket: SocketIOClient.Socket;
  users: User[];
  user: User;
  constructor(private userinfoService: UserinfoService, private router: Router, private activatedRouter: ActivatedRoute) { 
    this.user = new User("","", "","","","",null)
    this.socket = io.connect('http://localhost:3000')

    this.socket.on('conectado', function(socket){
      var socketlength = socket.length;
        console.log("numero de users", socketlength);
        this.outputList = [];
        /*for (var i = 0; i <= socketlength-1; i++) {
            console.log("socket ", socket[i]);
            //this.outputList.push(socket[i])
          }*/
    }.bind(this));    
  }

  ngOnInit() {


    //para recoger el email de la URL
  this.activatedRouter.params.subscribe(params => {
    if (typeof params['email'] !== 'undefined') {
      console.log("params", params);
      this.user.email = params['email'];      
      console.log("user: ", this.user);
    } else {
      this.user.email = '';
    }
  });
    this.getUsers();
  }
  getUsers(){
    this.userinfoService.getUsers()
      .subscribe(res =>{
        this.users = res; //res me recibe la lista de users    
      for(let i in this.users){
        if (this.users[i].email == this.user.email){
          this.getUser(this.users[i]._id);
          console.log("id: " + this.users[i]._id)
          this.getUser(this.users[i]._id)
        }
      }
    });
  }
  getUser(id:string){
    this.userinfoService.getUser(id)
    .subscribe(res =>{
      this.user = res;
      console.log("Usuario" + this.user._id) //porque pasa dos veces 
    })
  }
  /**
   *
   * @param id
   */
  confirmDelete(id: string, i: number) {
    if(confirm('El usuario se borrará de tu lista de usuarios...')){
      this.userinfoService.deleteUser(id)
        .subscribe(
          res =>{
            console.log(res);
            console.log("Se ha borrado correctamente ", i);
            //this.getProducts();
            //Two way data binding!
            this.users.splice(i,1);
            console.log("Se ha borrado correctamente ", this.users);

          },
          err => {
            this.handleError(err);
          });
    }
  }
  /**
   *
   * @param err
   */
  private handleError(err: HttpErrorResponse) {
    if( err.status == 500 ) {
      alert(err);
    }
  }
  goBack() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('');
  }



  //enviar al servidor que me he conectado al chat-socket
  sendConection(){
    this.socket.emit('user', this.user.email);
    console.log("conexion enviada   " + this.user.email);
  }
}
