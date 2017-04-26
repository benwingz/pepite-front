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

  getPepite(pepiteId: string): Observable<any> {
    return this.authHttp.get(this.appConf.apiBaseUrl + 'pepite/' + pepiteId)
      .map(response => {
        const jsonResponse = response.json();
        if (jsonResponse._id) {
          return new Pepite(jsonResponse._id, jsonResponse.name, jsonResponse.creation_date, jsonResponse.admin)
        }
      });
  }
}
