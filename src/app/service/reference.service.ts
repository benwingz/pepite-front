import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';
import { Phase } from '../models/phase.model';
import { Category } from '../models/category.model';
import { Grade } from '../models/grade.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


import { AppConfig } from '../app.config';

@Injectable()
export class ReferenceService {

  constructor(
    private authHttp: AuthHttp,
    private appConf: AppConfig
  ) {
  };

  getPhases(): Observable<Phase[]> {
    return this.authHttp.get(this.appConf.apiBaseUrl + 'phases/')
      .map((phases) => {
        let phasesJson = phases.json();
        let phasesReturned = [];
        phasesJson.forEach((phase) => {
          phasesReturned[phase.order] = new Phase(phase._id, phase.title, phase.order);
        });
        return phasesReturned;
      });
  }

  getPhase(id: string): Observable<Phase> {
    return this.authHttp.get(this.appConf.apiBaseUrl + 'phase/' + id)
      .map((phase) => {
        let phaseReturned = phase.json();
        phaseReturned = new Phase(phaseReturned._id, phaseReturned.title, phaseReturned.order);
        return phaseReturned;
      });
  }

  getCategories(): Observable<Category[]> {
    return this.authHttp.get(this.appConf.apiBaseUrl + 'categories/')
      .map((categories) => {
        let categoriesJson = categories.json();
        let categoriesReturned = [];
        categoriesJson.forEach((categorie) => {
          categoriesReturned.push(new Category(categorie._id, categorie.title, categorie.skills, categorie.order));
        });
        return categoriesReturned;
      });
  }

  getPhaseCategories(phase): Observable<Category[]> {
    return this.authHttp.get(this.appConf.apiBaseUrl + 'phase/' + phase.getId() + '/categories')
      .map((categories) => {
        let categoriesJson = categories.json();
        let categoriesReturned = [];
        categoriesJson.forEach((categorie) => {
          categoriesReturned[categorie.order] = new Category(categorie._id, categorie.title, categorie.skills, categorie.order);
        });
        return categoriesReturned;
      });
  }

  getGradesByPhase(phase: Phase, userId?: string): Observable<Grade[]> {
    let query: Observable<any>;
    if (userId) {
      query = this.authHttp.get(this.appConf.apiBaseUrl + 'phase/' + phase.getId() + '/grades', { params: {'user': userId} });
    } else {
      query = this.authHttp.get(this.appConf.apiBaseUrl + 'phase/' + phase.getId() + '/grades');
    }
    return query.map((grades) => {
      if (grades.json().length > 0) {
        let gradesReturned = grades.json();
        gradesReturned.forEach((grade, index) => {
          gradesReturned[index] = new Grade(grade._category, grade._user, grade.user_eval, grade._id, grade._validator, grade.validator_eval);
        })
        return gradesReturned;
      } else {
        return [];
      }
    })
  }
}
