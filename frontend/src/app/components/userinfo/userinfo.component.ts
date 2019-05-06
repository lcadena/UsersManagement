import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {UserinfoService} from "../../services/userinfo.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  users: User[];
  user: User;

  constructor(private userinfoService: UserinfoService, private router: Router, private ActivatedRouter: ActivatedRoute) { 
    this.user = new User ("","","","","","",null);
  }


  ngOnInit() {
    //para recoger el email de la URL
  this.ActivatedRouter.params.subscribe(params => {
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
}
