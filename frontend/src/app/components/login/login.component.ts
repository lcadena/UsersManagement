import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { User } from "../../models/user";
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { resetComponentState } from '@angular/core/src/render3/state';
import { ToastController } from '@ionic/angular';
declare var FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  validation_messages: any;

  constructor(private userService: AuthService, private router: Router, private formBuilder: FormBuilder, public toastController: ToastController) {

    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)])),

      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/^(?=.*\d).{4,8}$/)]))
    })

  }

  ngOnInit() {
    (window as any).fbAsyncInit = function() {
      FB.init({
        appId      : '594255334407767',
        cookie     : true,
        xfbml      : true,
        version    : 'v3.2'
      });      
      FB.AppEvents.logPageView();      
    };
    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));

      //validacion de menssages
    this.validation_messages = {
      'email': [
        { type: 'required', message: 'Email is required' },
        { type: 'pattern', message: 'Email must be valid. Must contain a @ and only one dot in the domain. Domain between 2 and 3 characters long' }
      ],
      'password': [
        { type: 'required', message: 'Password is required' },
        { type: 'pattern', message: 'Password must be valid. Must contain at least one number and must be between 4 and 8 characters' }
      ]
    }  
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: 2000
    });
    toast.present();
  }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      header: 'Toast header',
      message: 'Click to Close',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'star',
          text: 'Favorite',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

  login() {
    console.log(this.loginForm.value);
    let user = new User(this.loginForm.value.email,"","", this.loginForm.value.password,"","",null );
    this.userService.signin(user)
      .subscribe(
        res => {
          console.log(res);
          let token = res['token'];
          localStorage.setItem('token', token);
          //asigno el socket al logearse          
          this.router.navigateByUrl("/api/userinfo/" + this.loginForm.value.email);
        },
        err => {
          console.log(err);
          this.handleError(err);
        });
  } 
  loginFacebook() {
     let usuario;
     console.log("logearse con facebook");
     FB.login((response) => {
       console.log("FBBBBBBBBBBB: respuesta de logearse:  " , response);
       if (response.authResponse) { 
          usuario = new User (response.email, response.firstname, response.lastname, response.password,"","", null)
       }
      //recoger los datos de accesos necesarios
       


      
    }
     )
  }

  private handleError(err: HttpErrorResponse) {
    if( err.status == 500 ) {
      alert(err);
    } else if ( err.status == 404 ) {
      alert('The user does not exist');
    }
  }
}
