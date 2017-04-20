import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { User } from '../models/user.model';

@Injectable()
export class AuthService {

  public token: string;
  public currentUser: User;
  private userLogged = new Subject<User>();

  userIsLogged$ = this.userLogged.asObservable();

  constructor(
    private http: Http,
    private authHttp: AuthHttp
  ) {
  };

  userLoggedIn(user: User) {
    this.userLogged.next(user);
  }

  generateToken(userInfo): Promise<any> {
    return new Promise<string>((resolve, reject) => {
      this.fetchDistantToken(userInfo)
        .subscribe((responseJson) => {
          if (responseJson.token) {
            console.log('User Id:', responseJson.user_id);
            this.storeNewtoken(responseJson.token);
            this.storeUserId(responseJson.user_id);
          }
          resolve(responseJson);
        });
    });
  }

  fetchDistantToken(userInfo): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:8080/api/authenticate', userInfo, options)
      .map(response => response.json())
  }

  storeNewtoken(token): void {
    sessionStorage.setItem('token', token);
  }

  getStoredToken():string {
    return sessionStorage.getItem('token');
  }

  getCurrentUser(): Observable<any> {
    console.log('getUserIdFromLocalStorage', this.getUserIdFromLocalStorage())
    if (this.getUserIdFromLocalStorage()) {
      return this.authHttp.get('http://localhost:8080/api/user/' + this.getUserIdFromLocalStorage())
        .map(userReturned => {
          let user = userReturned.json();
          this.currentUser = new User (user._id, user.lastname, user.firstname, user.type, user.password, user.salt);
          this.userLoggedIn(this.currentUser);
          return this.currentUser;
        });
    } else {
      return Observable.of(false);
    }
  }

  getUserIdFromLocalStorage(): string {
    return sessionStorage.getItem('user_id');
  }

  storeUserId(id) {
    sessionStorage.setItem('user_id', id);
  }

  storeUser(user) {
    this.currentUser = new User (user._id, user.lastname, user.firstname, user.type, user.password, user.salt);
    console.log(this.currentUser);
    return user;
  }

}
