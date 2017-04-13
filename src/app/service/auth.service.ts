import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { User } from '../models/user.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  public token: string;
  public currentUser: User;

  constructor(
    private http: Http,
    private authHttp: AuthHttp
  ) {
  };

  generateToken(userInfo): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.fetchDistantToken(userInfo)
        .subscribe((responseJson) => {
          this.storeNewtoken(responseJson.token);
          console.log('User Id:', responseJson.user_id);
          this.storeUserId(responseJson.user_id);
          resolve(responseJson.token)
        });
    });
  }

  fetchDistantToken(userInfo): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:8080/api/authenticate', userInfo, options)
      .map(response => response.json());
  }

  storeNewtoken(token): void {
    sessionStorage.setItem('token', token);
  }

  getStoredToken():string {
    return sessionStorage.getItem('token');
  }

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
    this.currentUser = new User (user._id, user.lastname, user.firstname, user.type, user.password, user.salt);
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
