import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import 'rxjs/add/operator/map';

import { User } from  '../models/user.model';

import { AppConfig } from '../app.config';

@Injectable()
export class UsersService {


  constructor(
    private http: Http,
    private authHttp: AuthHttp,
    private appConf: AppConfig
  ) {
  };

  getUsers(userId?: string): Observable<any> {
    let query;
    if (userId) {
       query = this.authHttp.get(this.appConf.apiBaseUrl + 'users', {params: {user: userId}});
    } else {
      query = this.authHttp.get(this.appConf.apiBaseUrl + 'users');
    }
    return  query.map((response) => {
    //return this.authHttp.get(this.appConf.apiBaseUrl + 'users').map( (response) => {
      let userList: User[] = [];
      const jsonResponse = response.json();
      console.log(jsonResponse);
      if (jsonResponse.length > 0) {
        for (let i = 0; i <= jsonResponse.length -1; i++) {
          userList.push(new User(jsonResponse[i]._id, jsonResponse[i].email, jsonResponse[i].lastname, jsonResponse[i].firstname, jsonResponse[i].type, jsonResponse[i]._pepite, jsonResponse[i]._validator))
        }
        return userList;
      }
    });
  }

  createUser(userInfo): Observable<any> {
    return this.authHttp.post(this.appConf.apiBaseUrl + 'user', {email: userInfo.email, type: userInfo.type, pepite: userInfo._pepite})
      .map(response => response.json());
  }

  activateUser(userId:string): Observable<any> {
    return this.http.get(this.appConf.apiBaseUrl + 'activate/' + userId)
      .map( (userReturned) => {
        console.log(userReturned);
        let user = userReturned.json();
        return new User (user._id, user.email, user.lastname, user.firstname, user.type, user._pepite);
      });
  }

  doActivateUser(user: User, accountId: string): Observable<any> {
    console.log('user', user);
    return this.http.post(this.appConf.apiBaseUrl + 'activate/',{
      email: user.email,
      password: user.password,
      firstname: user.firstname,
      lastname: user.lastname,
      gender: user.gender,
      ine: user.ine,
      birthdate: user.birthdate,
      studyLevel: user.studyLevel,
      studyType: user.studyType,
      address: user.address,
      cp: user.cp,
      town: user.town,
      country: user.country,
      activationAccountId: accountId
    }).map(response => response.json());
  }

}
