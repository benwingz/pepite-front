import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { User } from  '../models/user.model';

import { AppConfig } from '../app.config';

@Injectable()
export class UsersService {


  constructor(
    private authHttp: AuthHttp,
    private appConf: AppConfig
  ) {
  };

  getUsers(): Observable<any> {
    return this.authHttp.get(this.appConf.apiBaseUrl + 'users')
      .map(response => {
        let userList: User[] = [];
        const jsonResponse = response.json();
        if (jsonResponse.length > 0) {
          for (let i = 0; i <= jsonResponse.length -1; i++) {
            userList.push(new User(jsonResponse[i]._id, jsonResponse[i].email, jsonResponse[i].lastname, jsonResponse[i].firstname, jsonResponse[i].type, jsonResponse[i]._pepite))
          }
          return userList;
        }
      });
  }
}
