import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { ResponseContentType, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { AppConfig } from '../app.config';


@Injectable()
export class ExportService {

  constructor(
    private authHttp: AuthHttp,
    private appConfig: AppConfig
  ) { }

  exportFull(userId): Observable<any> {
    return this.authHttp.get(this.appConfig.apiBaseUrl + 'export/full/' + userId, {responseType: ResponseContentType.Blob})
      .map(result => result);
  }

  exportSelf(userId): Observable<any> {
    return this.authHttp.get(this.appConfig.apiBaseUrl + '/export/self-evaluated/' + userId)
      .map(result => result);
  }

  exportValidate(userId): Observable<any> {
    return this.authHttp.get(this.appConfig.apiBaseUrl + '/export/validated/' + userId)
      .map(result => result);
  }

}
