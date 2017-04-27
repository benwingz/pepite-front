import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { User } from '../models/user.model';

import { AppConfig } from '../app.config';

@Injectable()
export class AuthService {

  public token: string;
  public currentUser: User;
  private userLogged = new Subject<User>();

  userIsLogged$ = this.userLogged.asObservable();

  constructor(
    private http: Http,
    private authHttp: AuthHttp,
    private appConf: AppConfig
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
            this.storeNewtoken(responseJson.token);
            this.storeUserId(responseJson.user_id);
          }
          resolve(responseJson);
        }, (error) => {
            reject(error.json());
        });
    });
  }

  fetchDistantToken(userInfo): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.appConf.apiBaseUrl + 'authenticate', userInfo, options)
      .map(response => response.json())
  }

  storeNewtoken(token): void {
    sessionStorage.setItem('token', token);
  }

  getStoredToken():string {
    return sessionStorage.getItem('token');
  }

  getCurrentUser(): Observable<any> {
    if (this.getUserIdFromLocalStorage()) {
      return this.authHttp.get(this.appConf.apiBaseUrl + 'user/' + this.getUserIdFromLocalStorage())
        .map(userReturned => {
          let user = userReturned.json();
          this.currentUser = new User (user._id, user.email, user.lastname, user.firstname, user.type, user._pepite);
          this.userLoggedIn(this.currentUser);
          return this.currentUser;
        });
    } else {
      return Observable.of(false);
    }
  }

  getUser(userId?: string): Observable<User> {
    if (this.getUserIdFromLocalStorage()) {
      let userDataObservable;
      if (!userId) {
        userDataObservable = this.authHttp.get(this.appConf.apiBaseUrl + 'user/' + this.getUserIdFromLocalStorage());
      } else {
        userDataObservable = this.authHttp.get(this.appConf.apiBaseUrl + 'user/' + userId);
      }
      return userDataObservable.map(userReturned => {
        let user = userReturned.json();
        return new User (user._id, user.email, user.lastname, user.firstname, user.type);
      });
    } else {
      return Observable.of(null);
    }
  }

  getUserIdFromLocalStorage(): string {
    return sessionStorage.getItem('user_id');
  }

  storeUserId(id) {
    sessionStorage.setItem('user_id', id);
  }

  logout(): Promise<any> {
    const userLoggedSubject = this.userLogged;
    return new Promise(function(resolve, reject) {
      sessionStorage.removeItem('user_id');
      sessionStorage.removeItem('token');
      userLoggedSubject.next(null);
      resolve(true);
    });
  }

}
