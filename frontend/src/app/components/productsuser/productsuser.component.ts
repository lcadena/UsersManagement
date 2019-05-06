import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {Product} from "../../models/product";
import {User} from '../../models/user';;
import { UserinfoService } from '../../services/userinfo.service';

@Component({
  selector: 'app-productsuser',
  templateUrl: './productsuser.component.html',
  styleUrls: ['./productsuser.component.css']
})
export class ProductsuserComponent implements OnInit {
  user: User;
  products: Product[];

  constructor(private userinfoService: UserinfoService, private router: Router, private productService: ProductService, private activatedRouter: ActivatedRoute) { 
    this.user = new User("","", "","","","",null);
  }

  ngOnInit() {
    //para recoger el id del user
    this.activatedRouter.params.subscribe(params => {
      if (typeof params['id'] !== 'undefined') {
        console.log("params", params);
        console.log("user: ", this.user);
        this.user._id = params['id'];
      } else {
        this.user._id = '';
      }
    });
    console.log ("info del URL:   " + this.user._id);
    
    this.getProductsuser(this.user._id);
    this.getUser(this.user._id)
  }

  getProductsuser(id: string){
    this.productService.getProductUser(id)
      .subscribe(res =>{
        this.products = res;
      });
    console.log("lista de productos  " + this.products);
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
    if(confirm('El producto se borrará de tu lista de productos...')){
      this.productService.deleteProduct(id)
        .subscribe(
          res =>{
            console.log(res);
            console.log("Se ha borrado correctamente ", i);
            //this.getProducts();
            //Two way data binding!
            this.products.splice(i,1);
            console.log("Se ha borrado correctamente ", this.products);

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

