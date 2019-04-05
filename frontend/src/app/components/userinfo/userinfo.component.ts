import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {UserinfoService} from "../../services/userinfo.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  constructor(private userinfoService: UserinfoService, private router: Router) { }

  users: User[];

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.userinfoService.getUsers()
      .subscribe(res =>{
        this.users = res; //res me recibe la lista de users
      });
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
