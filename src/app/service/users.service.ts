import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { User } from  '../models/user.model';

@Injectable()
export class UsersService {


  constructor(
    private authHttp: AuthHttp
  ) {
  };

  getUsers(): Observable<any> {
    return this.authHttp.get('http://localhost:8080/api/users')
      .map(response => {
        let userList: User[] = [];
        const jsonResponse = response.json();
        if (jsonResponse.length > 0) {
          for (let i = 0; i <= jsonResponse.length -1; i++) {
            userList.push(new User(jsonResponse[i]._id, jsonResponse[i].lastname, jsonResponse[i].firstname, jsonResponse[i].type))
          }
          return userList;
        }
      });
  }
}
