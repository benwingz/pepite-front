import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { Pepite } from  '../models/pepite.model';

import { AppConfig } from '../app.config';

@Injectable()
export class PepiteService {


  constructor(
    private authHttp: AuthHttp,
    private appConf: AppConfig
  ) {
  };

  getAllPepites(): Observable<any> {
    return this.authHttp.get(this.appConf.apiBaseUrl + 'pepites/')
      .map( (response) => {
        const jsonResponse = response.json();
        if (jsonResponse.success != false) {
          let pepiteList: Pepite[] = [];
          for (let i=0; i < jsonResponse.length; i++) {
            pepiteList.push(new Pepite(
              jsonResponse[i]._id,
              jsonResponse[i].name,
              jsonResponse[i].creation_date,
              jsonResponse[i]._admin));
          }
          return pepiteList;
        }
      });
  }

  getPepite(pepiteId: string): Observable<any> {
    return this.authHttp.get(this.appConf.apiBaseUrl + 'pepite/' + pepiteId)
      .map( (response) => {
        const jsonResponse = response.json();
        if (jsonResponse._id) {
          return new Pepite(
            jsonResponse._id,
            jsonResponse.name,
            jsonResponse.creation_date,
            jsonResponse._admin)
        }
      });
  }

  assignPepiteAdmin(userId: string, pepiteId: string): Observable<any> {
    return this.authHttp.patch(this.appConf.apiBaseUrl + 'pepite/', {id: pepiteId, _admin: userId})
      .map(response => response.json());
  }
}
