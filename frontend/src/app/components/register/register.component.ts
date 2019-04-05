import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "../../models/user";
import {passValidator} from "./validator";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  validation_messages: any;

  roles: string[] = ['--select--', 'admin', 'user'];

  rol: string; //recogida del rol

  constructor(private userService: AuthService,
              private router: Router, private formBuilder: FormBuilder) {

    this.registerForm = this.formBuilder.group({
        firstName: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern(/.{3,15}$/)])),

        lastName: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern(/.{3,25}$/)])),

        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)])),

       //hago un desplegable a escoger endre admin / user que sea obligatorio y ya
      //  rol: new FormControl('', Validators.compose([
      //    Validators.pattern("admin"||"user"),
      //  ])),

        password: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern(/^(?=.*\d).{4,8}$/)])),

        confirmPassword: ['', passValidator]
      }
    )
  }

  ngOnInit() {
    this.validation_messages = {
      'firstName': [
        { type: 'required', message: 'Name is required'},
        { type: 'pattern', message: 'It has to be between 3 and 15 characters long'}
      ],
      'lastName': [
        { type: 'required', message: 'Last name is required'},
        { type: 'pattern', message: 'It has to be between 3 and 25 characters long'}
      ],
      'email': [
        { type: 'required', message: 'Email is required' },
        { type: 'unique', message: 'Email must be unique'} ,
        { type: 'pattern', message: 'It must be valid. Must contain a @ and only one dot in the domain. Domain between 2 and 3 characters long' }
      ],
    //  'rol': [
    //    { type: 'required', message: 'Rol is required' },
    //  ],
      'password': [
        { type: 'required', message: 'Password is required' },
        { type: 'pattern', message: 'It must be valid. Must contain at least one number and must be between 4 and 8 characters' }
      ],
      'confirmPassword': [
        { type: 'required', message: 'Password is required and both must match' },
        { type: 'pattern', message: 'It must be valid. Must contain at least one number and must be between 4 and 8 characters' }
      ]
    }
  }

  /* //html de rol
          <div class="validation-errors">
        <ng-container *ngFor="let validation of validation_messages.firstName">
          <div class="alert alert-danger" *ngIf="registerForm.get('rol').hasError(validation.type) && (registerForm.get('rol').dirty || registerForm.get('rol').touched)">
            {{ validation.message }}
          </div>
        </ng-container>
      </div>*/

  register() {
    console.log(this.registerForm.value);
    console.log (this.rol);
    let user = new User( this.registerForm.value.email, this.registerForm.value.firstName, this.registerForm.value.lastName, this.registerForm.value.password, "","",null/*,  this.registerForm.value.rol*/);
    this.userService.signup(user)
      .subscribe(
        res => {
          console.log(res);
          let token = res['token'];
          localStorage.setItem('token', token);

         if (this.registerForm.value.rol =="admin"){
           this.router.navigateByUrl("/api/userinfo");}

         else if(this.registerForm.value.rol =="user"){
           this.router.navigateByUrl("/api/userinfo");
         }
          else
            this.router.navigateByUrl("/api/userinfo");
        },

        err => {
          console.log(err);
          this.handleError(err);
        });

  }

private handleError(err: HttpErrorResponse) {
  if( err.status == 500 ) {
    alert(err);
  } else if ( err.status == 404 ) {
    alert('404 not found');
  }
  else
    this.registerForm.get("email").setErrors({unique: true});
}

}
