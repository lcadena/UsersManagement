import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../models/product";
import { User } from '../../models/user';

@Component({
  selector: 'app-productsuser',
  templateUrl: './productsuser.component.html',
  styleUrls: ['./productsuser.component.css']
})
export class ProductsuserComponent implements OnInit {
  user: User;
  products: Product[];

  constructor(private router: Router, private productService: ProductService, private activatedRouter: ActivatedRoute) { 
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
  }

  getProductsuser(id: string){
    this.productService.getProductUser(id)
      .subscribe(res =>{
        this.products = res;
      });
    console.log("lista de productos  " + this.products);

  }




}
