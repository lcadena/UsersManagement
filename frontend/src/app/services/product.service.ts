import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from "../models/product";
import { Environment } from "./environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  environment: Environment;
  selectedProduct: Product;
  products: Product[];

  constructor(private http: HttpClient) {
    this.selectedProduct = new Product();
    this.environment = new Environment();
  }

  getProducts():Observable<Product[]> {
    return this.http.get<Product[]>(this.environment.urlUser + 'products');
  }

  getSingleProduct(_id: string) {
    return this.http.get(this.environment.urlProduct + `/${_id}`);
  }

  //añade nuevo producto
  saveProduct(product: Product) {
    return this.http.post(this.environment.urlProduct, product)
  }

  putProduct(product: Product) {
    return this.http.put(this.environment.urlProduct + `/${product._id}`, product)
  }

  deleteProduct(_id: string) {
    return this.http.delete(this.environment.urlProduct + `/${_id}`);
  }
  //Lista de los productos por usuario
  getProductUser(_id: string ):Observable<Product[]>{
    return this.http.get<Product[]>(this.environment.urlUser + 'products' + `/${_id}`);
  }
  
}

