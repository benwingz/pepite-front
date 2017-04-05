import { Pipe, PipeTransform } from '@angular/core';
import {Grade} from '../models/grade.model';

@Pipe({
  name: 'evaluatedgrade'
})
export class EvaluatedGradePipe implements PipeTransform {

  constructor() {

  }

  transform(grades: Grade[]): any {
    let gradeFiltered = grades.filter((grade) => {
      return grade.validator && grade.validator_eval;
    });
    return gradeFiltered;
  }
}
