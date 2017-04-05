import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import { UserService } from './user.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SessionService {

  token: string;

  constructor(
    private http: Http,
    private userService: UserService
  ) {
  };

  generateToken(userInfo): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.fetchDistantToken(userInfo)
        .subscribe((responseJson) => {
          this.storeNewtoken(responseJson.token);
          console.log('User Id:', responseJson.user_id);
          this.userService.storeUserId(responseJson.user_id);
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

}
