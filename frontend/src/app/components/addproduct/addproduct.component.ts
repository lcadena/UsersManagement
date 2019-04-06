import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";


@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css'],
  providers: [ProductService]
})
export class AddproductComponent implements OnInit {

  addproductForm: FormGroup;

  validation_messages: any;


  constructor(private addproductService: ProductService,
              private router: Router, private formBuilder: FormBuilder) {

    this.addproductForm = this.formBuilder.group({
        name: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern(/.{3,15}$/)])),

        category: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern(/.{3,25}$/)])),

        description: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern(/.{3,250}$/)])),

      }
    )
  }

  ngOnInit() {
    this.validation_messages = {
      'name': [
        { type: 'required', message: 'Name is required'},
        { type: 'pattern', message: 'It has to be between 3 and 15 characters long'}
      ],
      'category': [
        { type: 'required', message: 'Category is required'},
        { type: 'pattern', message: 'It has to be between 3 and 25 characters long'}
      ],
      'description': [
        { type: 'required', message: 'Description is required' },
        { type: 'pattern', message: 'It has to be between 3 and 250 characters long' }
      ]
    }
  }

  addProduct() {
    console.log(this.addproductForm.value);
    let product = new Product("", this.addproductForm.value.name, "",0, this.addproductForm.value.category, this.addproductForm.value.description);
    this.addproductService.saveProduct(product)
      .subscribe(
        res => {
          console.log(res);
          let token = res['token'];
          localStorage.setItem('token', token);

          this.router.navigateByUrl("/api/product");
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

}

}
