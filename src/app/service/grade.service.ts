import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';
import { Category } from '../models/category.model';
import { Grade } from '../models/grade.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GradeService {

  constructor(private authHttp: AuthHttp) {
  };

  getGrades(): Observable<Grade[]> {
    return this.authHttp.get('http://localhost:8080/api/grades/')
      .map((grades) => {
        let gradesReturned = grades.json();
        gradesReturned.forEach((gradesJson, index) => {
          gradesReturned[index] = new Grade(
            gradesJson._id,
            gradesJson._category,
            gradesJson._user,
            gradesJson.user_eval,
            (gradesJson._validator) ? gradesJson._validator: null,
            (gradesJson.validator_eval) ? gradesJson.validator_eval: null
          );
        });
        return gradesReturned;
      });
  }

  getCategoryGrades(category: Category): Observable<Grade[]> {
    return this.authHttp.get('http://localhost:8080/api/category/' + category.getId() + '/grades')
      .map((grades) => {
        let gradesReturned = grades.json();
        gradesReturned.forEach((gradesJson, index) => {
          gradesReturned[index] = new Grade(
            gradesJson._id,
            gradesJson.category,
            gradesJson.user,
            gradesJson.user_eval,
            (gradesJson.validator) ? gradesJson.validator: null,
            (gradesJson.validator_eval) ? gradesJson.validator_eval: null
          );
        });
        return gradesReturned;
      });
  }
}
