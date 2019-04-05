import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { ProductsComponent } from "./components/products/products.component";
import { MyguardGuard } from "./myguard.guard";
import {ProductdetailComponent} from "./components/productdetail/productdetail.component";
import {UserinfoComponent} from "./components/userinfo/userinfo.component";

const routes: Routes = [
  { path: 'api/signin', component: LoginComponent },
  { path: 'api/signup', component: RegisterComponent },
  { path: 'api/product', component: ProductsComponent, canActivate: [MyguardGuard] },
  { path: 'api/product/:id', component: ProductdetailComponent, canActivate: [MyguardGuard], pathMatch: 'full'},
  { path: '', redirectTo: '/api/signin', pathMatch: 'full' },
  { path: 'api/userinfo', component: UserinfoComponent, canActivate: [MyguardGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
