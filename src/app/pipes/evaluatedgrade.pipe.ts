import { Pipe, PipeTransform } from '@angular/core';
import {Grade} from '../models/grade.model';

@Pipe({
  name: 'evaluatedgrade'
})
export class EvaluatedGradePipe implements PipeTransform {

  constructor() {

  }

  transform(grades: any): any {
    if (!grades) {
      return false;
    } else {
      if (grades.length > 1) {
        let gradeFiltered = grades.filter((grade) => {
          return grade.validator_eval;
        });
        return gradeFiltered;
      } else {
        return (grades.validator_eval) ? true: false;
      }
    }
  }
}
