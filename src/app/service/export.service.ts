import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { ResponseContentType, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { Http } from '@angular/http';

import { AppConfig } from '../app.config';


@Injectable()
export class ExportService {

  constructor(
    private authHttp: AuthHttp,
    private appConfig: AppConfig
  ) { }

  private extractFile(result: Response) {
    return  URL.createObjectURL(result.blob());
  }

  exportFull(userId): Observable<any> {
    return this.authHttp.get(this.appConfig.apiBaseUrl + 'export/full/' + userId, {
        responseType: ResponseContentType.Blob
      }).map(this.extractFile);
  }

  exportSelf(userId): Observable<any> {
    return this.authHttp.get(this.appConfig.apiBaseUrl + '/export/self-evaluated/' + userId, {
        responseType: ResponseContentType.Blob
      })
      .map(this.extractFile);
  }

  exportValidate(userId): Observable<any> {
    return this.authHttp.get(this.appConfig.apiBaseUrl + '/export/validated/' + userId, {
        responseType: ResponseContentType.Blob
      })
      .map(this.extractFile);
  }

}
