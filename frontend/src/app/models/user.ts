export class User {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  rol: string;
  _id: string;
  signUpDate: Date;

  constructor(email = '', firstName = '', lastName = '', password = '', rol = '', _id = '', signUpDate){
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.rol = rol;
    this._id = _id;
    this.signUpDate = signUpDate;
  }
}
