import {Product} from "./product";

export class User {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  rol: string;
  _id: string;
  signUpDate: Date;
  products: Product[];

  constructor(email: string = '', firstName: string = '', lastName:string = '', password:string = '', rol:string = '', _id:string = '', signUpDate:Date){
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.rol = rol;
    this._id = _id;
    this.signUpDate = signUpDate;
    this.products = [];
  }
}
