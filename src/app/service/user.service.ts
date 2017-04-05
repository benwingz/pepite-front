import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';
import { User } from '../models/user.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {

  public currentUser: User;

  constructor(private authHttp: AuthHttp) {
  };

  getCurrentUser(): Observable<User> {
    return this.authHttp.get('http://localhost:8080/api/user/' + this.getUserIdFromLocalStorage())
      .map(user => this.storeUser(user.json()));
  }

  getUserIdFromLocalStorage(): string {
    return sessionStorage.getItem('user_id');
  }

  storeUserId(id) {
    sessionStorage.setItem('user_id', id);
  }

  storeUser(user) {
    this.currentUser = new User (user._id, user.lastname, user.firstname, user.password, user.salt);
    return user;
  }

  getUser(): any {
    return new Promise<User>(function(resolve, reject) {
      if (this.currentUser) {
        resolve(this.currentUser);
      } else {
        reject(false);
      }
    });
  }

}
