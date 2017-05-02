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

  private extractFile(result: Response) {

    //let blob = new Blob([result._body], {type: 'application/octet-binary'});
    let url = URL.createObjectURL(result.blob());

    return url;
  }

  exportFull(userId): Observable<any> {
    return this.authHttp.get(this.appConfig.apiBaseUrl + 'export/full/' + userId, {responseType: ResponseContentType.Blob})
      .map(this.extractFile);
  }

  exportSelf(userId): Observable<any> {
    return this.authHttp.get(this.appConfig.apiBaseUrl + '/export/self-evaluated/' + userId)
      .map(this.extractFile);
  }

  exportValidate(userId): Observable<any> {
    return this.authHttp.get(this.appConfig.apiBaseUrl + '/export/validated/' + userId)
      .map(this.extractFile);
  }

}
