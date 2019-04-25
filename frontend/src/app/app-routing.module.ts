import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { ProductsComponent } from "./components/products/products.component";
import { MyguardGuard } from "./myguard.guard";
import {ProductdetailComponent} from "./components/productdetail/productdetail.component";
import {UserinfoComponent} from "./components/userinfo/userinfo.component";
import {UserinfodetailComponent} from "./components/userinfodetail/userinfodetail.component";
import {AddproductComponent} from "./components/addproduct/addproduct.component";
import {AddticketComponent} from "./components/addticket/ticket.component";
import {AddtiendaComponent } from "./components/addtienda/tienda.component";
import {ModifytiendaComponent } from "./components/modifytienda/modifytienda.component";
import {ModifyticketComponent } from "./components/modifyticket/modifyticket.component";

const routes: Routes = [
  { path: 'api/signin', component: LoginComponent },
  { path: 'api/signup', component: RegisterComponent },
  { path: 'api/product', component: ProductsComponent, canActivate: [MyguardGuard] },
  { path: 'api/product/:id', component: ProductdetailComponent, canActivate: [MyguardGuard], pathMatch: 'full'},
  { path: '', redirectTo: '/api/signin', pathMatch: 'full' },
  { path: 'api/userinfo', component: UserinfoComponent, canActivate: [MyguardGuard] },
  { path: 'api/user/:id', component: UserinfodetailComponent, canActivate: [MyguardGuard] },
  { path: 'api/addproduct', component: AddproductComponent, canActivate: [MyguardGuard] },
  { path: 'api/ticket', component: AddticketComponent},
  { path: 'api/tienda', component: AddtiendaComponent},
  { path: 'api/tienda/:id', component: ModifytiendaComponent},
  { path: 'api/ticket/:id', component: ModifyticketComponent},
  { path: 'api/tickets', component: ModifyticketComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
