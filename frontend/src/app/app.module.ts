import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { InterceptorService } from "./services/interceptor.service";
import { ProductdetailComponent } from './components/productdetail/productdetail.component';
import { UserinfoComponent } from "./components/userinfo/userinfo.component";
import {UserinfodetailComponent} from "./components/userinfodetail/userinfodetail.component";
import {AddproductComponent} from "./components/addproduct/addproduct.component";
import { AddtiendaComponent } from './components/addtienda/addtienda.component';
import { AddticketComponent } from './components/addticket/addticket.component';
import { ModifytiendaComponent } from './components/modifytienda/modifytienda.component';
import { ModifyticketComponent } from './components/modifyticket/modifyticket.component';
import { ModifyuserComponent } from './components/modifyuser/modifyuser.component';
import { ModifyproductComponent } from './components/modifyproduct/modifyproduct.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { ProductsfromticketComponent } from './productsfromticket/productsfromticket.component';
//import { ProductsuserComponent } from './components/productsuser/productsuser.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    LoginComponent,
    RegisterComponent,
    ProductdetailComponent,
    UserinfoComponent,
    UserinfodetailComponent,
    AddproductComponent,
    AddtiendaComponent,
    AddticketComponent,
    ModifytiendaComponent,
    ModifyticketComponent,
    ModifyuserComponent,
    ModifyproductComponent,
    TicketComponent,
    TiendaComponent,
    ProductsfromticketComponent,
    //ProductsuserComponent
],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
