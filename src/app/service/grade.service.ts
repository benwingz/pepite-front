import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';
import { Category } from '../models/category.model';
import { Grade } from '../models/grade.model';
import { User } from '../models/user.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { AppConfig } from '../app.config';

@Injectable()
export class GradeService {

  constructor(
    private authHttp: AuthHttp,
    private appConf: AppConfig
  ) {
  };

  getGrades(user?: string): Observable<Grade[]> {
    let query;
    if (user) {
      query = this.authHttp.get(this.appConf.apiBaseUrl + 'grades/', {params: {'user': user}});
    } else {
      query = this.authHttp.get(this.appConf.apiBaseUrl + 'grades/');
    }
    return query.map((grades) => {
      let gradesReturned = grades.json();
      if (gradesReturned.length > 0) {
        gradesReturned.forEach((gradesJson, index) => {
          gradesReturned[index] = new Grade(
            gradesJson._category,
            gradesJson._user,
            gradesJson.user_eval,
            gradesJson._id,
            (gradesJson._validator) ? gradesJson._validator: null,
            (gradesJson.validator_eval) ? gradesJson.validator_eval: null
          );
        });
      } else {
        gradesReturned = [];
      }
      return gradesReturned;
    });
  }

  getUserGrades(userId: string): Observable<Grade[]> {
    return this.authHttp.get(this.appConf.apiBaseUrl + 'user/' +  userId + '/grades/')
      .map((grades) => {
        let gradesReturned = grades.json();
        if (gradesReturned.length > 0) {
          gradesReturned.forEach((gradesJson, index) => {
            gradesReturned[index] = new Grade(
              gradesJson._category,
              gradesJson._user,
              gradesJson.user_eval,
              gradesJson._id,
              (gradesJson._validator) ? gradesJson._validator: null,
              (gradesJson.validator_eval) ? gradesJson.validator_eval: null
            );
          });
        } else {
          gradesReturned = [];
        }
        return gradesReturned;
      });
  }

  getCategoryGrades(category: Category, user?: string): Observable<Grade[]> {
    let query;
    if (user) {
      query = this.authHttp.get(this.appConf.apiBaseUrl + 'category/' + category.getId() + '/grades', { params: {'user': user} });
    } else {
      query = this.authHttp.get(this.appConf.apiBaseUrl + 'category/' + category.getId() + '/grades');
    }
    return query.map((grades) => {
      let gradesReturned = grades.json();
      if(gradesReturned.length > 0) {
        gradesReturned.forEach((gradesJson, index) => {
          gradesReturned[index] = new Grade(
            gradesJson._category,
            new User(gradesJson._user._id, gradesJson._user.email, gradesJson._user.lastname, gradesJson._user.firstname, gradesJson._user.type),
            gradesJson.user_eval,
            gradesJson._id,
            (gradesJson._validator) ? new User(gradesJson._validator._id, gradesJson._user.email, gradesJson._validator.lastname, gradesJson._validator.firstname, gradesJson._validator.type): null,
            (gradesJson.validator_eval) ? gradesJson.validator_eval: {value: 0}
          );
        });
      }
      return gradesReturned;
    });
  }

  removeGrade(grade: Grade): Observable<any> {
    return this.authHttp.delete(this.appConf.apiBaseUrl + 'grade/' + grade._id)
      .map(result => result.json());
  }

  postGrade(userId: string, categoryId: string, value: number, validator?:string, validator_value?:number): Observable<any> {
    let query;
    if (validator && validator_value) {
      query = this.authHttp.post(this.appConf.apiBaseUrl + 'grade/',{user: userId, category: categoryId, value: value, validator: validator, validator_value: validator_value});
    } else {
      query = this.authHttp.post(this.appConf.apiBaseUrl + 'grade/',{user: userId, category: categoryId, value: value});
    }
    return query.map(result => result.json());
  }

  patchGrade(gradeModifications: object): Observable<any> {
    return this.authHttp.patch(this.appConf.apiBaseUrl + 'grade/',gradeModifications)
      .map(result => result.json());
  }
}
