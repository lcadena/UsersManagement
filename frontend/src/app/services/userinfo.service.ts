import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from "./environment";
import {User} from "../models/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {

  environment: Environment;
  selectedUser: User;
  users: User[];

  constructor(private http: HttpClient) {
    this.selectedUser = new User();
    this.environment = new Environment();
  }

  getUsers():Observable<User[]> { //tengo que recibir el tipo User para que me haga bien la lista
    return this.http.get<User[]>(this.environment.urlUserList);
  }

  getSingleUser(_id: string) {
    return this.http.get(this.environment.urlUserList + `/${_id}`);
  }

  deleteUser(_id: string) {
    return this.http.delete(this.environment.urlUserList + `/${_id}`);
  }

  postUser(user: User) {
    return this.http.post(this.environment.urlUserList, user);
  }

  /*putUser(product: User) {
    return this.http.put(this.environment.urlUserList + `/${user.email}`, user);
  }*/

}
