export class User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  rol: string;

  constructor(_id = '', email = '', firstName = '', lastName = '', password = '', rol = ''){
    this._id = _id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.rol = rol;
  }
}
