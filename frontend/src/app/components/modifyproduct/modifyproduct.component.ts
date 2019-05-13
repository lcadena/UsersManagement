import { Component, OnInit } from '@angular/core';
import {Product} from "../../models/product";
import {Router, ActivatedRoute} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-modifyproduct',
  templateUrl: './modifyproduct.component.html',
  styleUrls: ['./modifyproduct.component.css']
})

export class ModifyproductComponent implements OnInit {

  productForm: FormGroup;
  actual: Product;
  product: Product;

  constructor(private activatedRouter: ActivatedRoute, private productService: ProductService,
    private router: Router, private formBuilder: FormBuilder) {
    this.actual = new Product("","","",null,"",null,null,"");
    this.productForm = this.formBuilder.group({
      name: new FormControl(),
      category: new FormControl(),
      price: new FormControl(), 
      description: new FormControl(),
    })
  }

  ngOnInit() {
    //para recoger el id del producto de la URL
    this.activatedRouter.params.subscribe(params => {
      if (typeof params['id'] !== 'undefined') {
        this.actual._id = params['id'];
      } else {
        this.actual._id = '';
      }
    });
    this.getSingleProduct(this.actual._id);
  }

  getSingleProduct(id: string) {
    this.productService.getSingleProduct(id)
      .subscribe(
        res =>{
          console.log("info de un producto", res);
        this.actual = res["product"];
      })   
  }

  modify(id:string){
    this.product = new Product(id, this.productForm.value.name,null, this.productForm.value.price, this.productForm.value.category,null,null, this.productForm.value.description,)
    console.log("El producto a modificar ", this.product)
    this.productService.modifyproduct(this.product)
    .subscribe(
      res => {
        console.log("resp de modificar ",res)
      })
  }
  goBack() {
    localStorage.removeItem('token');
  }

}
