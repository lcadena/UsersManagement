import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {UserinfoService} from "../../services/userinfo.service";
import {User} from "../../models/user";
import { MenuController } from '@ionic/angular';

//import {ToolbarService} from "../../../../services/toolbar.service"; crear



@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {
  users: User[];
  user: User;  
  constructor(private userinfoService: UserinfoService, private router: Router,
     private activatedRouter: ActivatedRoute, private menu: MenuController) { 
    this.user = new User("","", "","","","",null)        
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


  deleteUser(user){

    let index = this.users.indexOf(user);

    if(index > -1){
        this.users.splice(index, 1);
    }
}


  openMenu(){
    console.log("Abrir menu");
    this.router.navigateByUrl('/api/menu/' + this.user._id);
    
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
}
