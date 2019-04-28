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
import {TicketComponent} from "./components/ticket/ticket.component";
import {TiendaComponent} from "./components/tienda/tienda.component";
import {AddticketComponent} from "./components/addticket/addticket.component";
import {AddtiendaComponent } from "./components/addtienda/addtienda.component";
import {ModifytiendaComponent } from "./components/modifytienda/modifytienda.component";
import {ModifyticketComponent } from "./components/modifyticket/modifyticket.component";
import {ProductsuserComponent } from "./components/productsuser/productsuser.component";
import { TicketsuserComponent } from './components/ticketsuser/ticketsuser.component';

const routes: Routes = [ 
  //usuario
  { path: 'api/signin', component: LoginComponent },
  { path: 'api/signup', component: RegisterComponent },
  { path: '', redirectTo: '/api/signin', pathMatch: 'full' },   
  { path: 'api/userinfo', component: UserinfoComponent, canActivate: [MyguardGuard] },
  { path: 'api/user/:id', component: UserinfodetailComponent, canActivate: [MyguardGuard] },
  //productos
  { path: 'api/product', component: ProductsComponent, canActivate: [MyguardGuard] },
  { path: 'api/product/:id', component: ProductdetailComponent, canActivate: [MyguardGuard], pathMatch: 'full'},
  { path: 'api/addproduct', component: AddproductComponent, canActivate: [MyguardGuard] },
  //ticket
  { path: 'api/ticket', component: AddticketComponent},
  { path: 'api/tickets', component: TicketComponent, },
  { path: 'api/ticket/:id', component: ModifyticketComponent},
  //tienda
  { path: 'api/tienda', component: AddtiendaComponent},
  { path: 'api/tiendas', component: TiendaComponent},
  { path: 'api/tienda/:id', component: ModifytiendaComponent},
  //lista dependiendta de usuario
  { path: 'api/productsuser/:id', component: ProductsuserComponent},
  { path: 'api/ticketsuser/:id', component: TicketsuserComponent},
  { path: 'api/tiendasuser/:id', component: TiendaComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
