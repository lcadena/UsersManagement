import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { Camera } from '@ionic-native/camera/ngx';
import { IonicStorageModule } from '@ionic/storage';



import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { InterceptorService } from "./services/interceptor.service";
import { ProductdetailComponent } from './components/productdetail/productdetail.component';
import { UserinfoComponent } from "./components/userinfo/userinfo.component";
import { UserinfodetailComponent} from "./components/userinfodetail/userinfodetail.component";
import { AddproductComponent} from "./components/addproduct/addproduct.component";
import { AddticketComponent } from './components/addticket/addticket.component';
import {AddtiendaComponent} from './components/addtienda/addtienda.component';
import { ModifytiendaComponent } from './components/modifytienda/modifytienda.component';
import { ModifyticketComponent } from './components/modifyticket/modifyticket.component';
import { ModifyuserComponent } from './components/modifyuser/modifyuser.component';
import { ModifyproductComponent } from './components/modifyproduct/modifyproduct.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { ProductsuserComponent } from './components/productsuser/productsuser.component';
import { TicketsuserComponent } from './components/ticketsuser/ticketsuser.component';
import { TiendasuserComponent } from './components/tiendasuser/tiendasuser.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


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
    AddticketComponent,
    AddtiendaComponent,
    ModifytiendaComponent,
    ModifyticketComponent,
    ModifyuserComponent,
    ModifyproductComponent,
    TicketComponent,
    TiendaComponent,
    ProductsuserComponent,
    TicketsuserComponent,
    TiendasuserComponent,
    //ProductsuserComponent
  ],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    [{provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
    { provide: RouteReuseStrategy,  useClass: IonicRouteStrategy },
    ],

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
