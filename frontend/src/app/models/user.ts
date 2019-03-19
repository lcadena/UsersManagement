export class User {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  rol: string;

  constructor(email = '', firstName = '', lastName = '', password = '', rol = ''){
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.rol = rol;
  }
}
