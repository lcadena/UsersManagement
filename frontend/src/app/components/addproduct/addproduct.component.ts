import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router"
import { User } from '../../models/user';
import { UserinfoService } from '../../services/userinfo.service';
import { Product } from "../../models/product";
import { ProductService } from "../../services/product.service";


@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css'],
  providers: [ProductService]
})
export class AddproductComponent implements OnInit {

  addproductForm: FormGroup;
  validation_messages: any;
  user: User;
  product: Product;


  constructor(private productService: ProductService, private router: Router, private formBuilder: FormBuilder,
    private userService: UserinfoService, private activatedRouter: ActivatedRoute) {
      this.user = new User("","", "","","","",null);

    this.addproductForm = this.formBuilder.group({
        nameproducto: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern(/.{3,15}$/)])),

        price: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern(/^((?!(0))[0-9]{2,4})$/)])),

        category: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern(/.{3,25}$/)])),

        description: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern(/.{3,23}$/)])),

      }
    )
  }

  ngOnInit() {
    //para recoger el id del user de la URL
    this.activatedRouter.params.subscribe(params => {
      if (typeof params['id'] !== 'undefined') {
        console.log("params", params);        
        this.user._id = params['id'];
      } else {
        this.user._id = '';
      }
    });

    this.validation_messages = {
      'nameproducto': [
        { type: 'required', message: 'Name is required'},
        { type: 'pattern', message: 'It has to be between 3 and 15 characters long'}
      ],
      'price': [
            { type: 'required', message: 'Price is required'},
            { type: 'pattern', message: 'It can not begin by a 0 and has to be between 2 and 4 digits long'}
      ],
      'category': [
        { type: 'required', message: 'Category is required'},
        { type: 'pattern', message: 'It has to be between 3 and 25 characters long'}
      ],
      'description': [
        { type: 'required', message: 'Dates are required' },
        { type: 'pattern', message: 'It has to be between 3 and 22 characters long: XX/XX/XXXX--XX/XX/XXXX' }
      ]
    }
  }

  addProduct() {
    this.product = new Product ("",this.addproductForm.value.nameproducto, "", this.addproductForm.value.price, this.addproductForm.value.category, null, null, this.addproductForm.value.description)

    this.productService.saveProduct(this.product)
      .subscribe(
        (res:Product) => {
          console.log("respuesta" + res)
          this.product = res
          let token = res['token'];
          localStorage.setItem('token', token)
          let data ={
            "iduser": this.user._id,
            "idproduct": this.product._id};
          console.log("data", data)
          let body = JSON.stringify(data )
          this.userService.addProductToUser(this.user._id, this.product._id, body)
          .subscribe(
            res => {
              console.log("producto" + res);
            })     
        },

        err => {
          console.log(err);
          this.handleError(err);
        });

  }

private handleError(err: HttpErrorResponse) {
  if( err.status === 500 ) {
    alert(err);
  } else if ( err.status === 404 ) {
    alert('404 not found');
  }

}

}
