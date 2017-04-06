import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';
import { Phase } from '../models/phase.model';
import { Category } from '../models/category.model';
import { Grade } from '../models/grade.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ReferenceService {

  constructor(private authHttp: AuthHttp) {
  };

  getPhases(): Observable<Phase[]> {
    return this.authHttp.get('http://localhost:8080/api/phases/')
      .map((phases) => {
        let phasesReturned = phases.json();
        phasesReturned.forEach((phase) => {
          phasesReturned[phase.order] = new Phase(phase._id, phase.title, phase.order);
        });
        return phasesReturned;
      });
  }

  getPhase(id: string): Observable<Phase> {
    return this.authHttp.get('http://localhost:8080/api/phase/' + id)
      .map((phase) => {
        let phaseReturned = phase.json();
        phaseReturned = new Phase(phaseReturned._id, phaseReturned.title, phaseReturned.order);
        return phaseReturned;
      });
  }

  getPhaseCategories(phase): Observable<Category[]> {
    return this.authHttp.get('http://localhost:8080/api/phase/' + phase.getId() + '/categories')
      .map((categories) => {
        let categoriesReturned = categories.json();
        categoriesReturned.forEach((categoriesJson) => {
          categoriesReturned[categoriesJson.order] = new Category(categoriesJson._id, categoriesJson.title, categoriesJson.skills, categoriesJson.order);
        });
        return categoriesReturned;
      });
  }

  getGradesByPhase(phase): Observable<Grade[]> {
    return this.authHttp.get('http://localhost:8080/api/phase/' + phase.getId() + '/grades')
      .map((grades) => {
        if (grades.json().length > 1) {
          let gradesReturned = grades.json();
          gradesReturned.forEach((grade, index) => {
            gradesReturned[index] = new Grade(grade._id, grade._category, grade._user, grade.user_eval, grade._validator, grade.validator_eval);
          })
          return gradesReturned;
        } else {
          return [];
        }
      })
  }
}
