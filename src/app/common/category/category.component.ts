import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';

import { GradeService } from '../../service/grade.service';

import { Category } from '../../models/category.model';
import { Grade } from '../../models/grade.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {

  public elementRef;

  @Input()
  private category: Category;
  @Input()
  private user: string;
  private focused: boolean;
  private legendActive: boolean;
  private buttonBool: boolean;
  @Output()
  focus = new EventEmitter();

  private categoryGrade: Grade;

  constructor(
    myElement: ElementRef,
    private gradeService: GradeService
  ) {
    this.elementRef = myElement;
  };

  ngOnInit(): void {
    this.getCatGrade()
    this.focused = false;
    this.buttonBool = false;
  };

  getCatGrade(): void {
    let query;
    if (this.user) {
      query = this.gradeService.getCategoryGrades(this.category, this.user);
    } else {
      query = this.gradeService.getCategoryGrades(this.category);
    }
    query.subscribe((grades) => {
      if (grades.length > 0) {
        this.categoryGrade = grades[0];
      }
    });
  }

  handleClick(event) {
    this.focused = !this.focused;
  };

  toggleLegend(event): void {
    event.stopPropagation();
    this.legendActive = !this.legendActive;
  };

  expendCat(event): void {
     event.stopPropagation();
     this.buttonBool = true;
     this.handleClick(event);
  };

  changeGrade($event) {
    if ($event.removeGrade) {
      delete this.categoryGrade;
    } else {
      let query;
      if ($event.emptyGrade) {
        if ($event.type != 'validation-eval') {
          query = this.gradeService.postGrade($event.userId, $event.categoryId, $event.value);
        } else {
          query = this.gradeService.postGrade(this.user, $event.categoryId, $event.value, $event.userId, $event.value);
        }
        query.subscribe((result) => {
          if (result.success) {
            this.getCatGrade();
          }
        });
      } else {
        if ($event.type != 'validation-eval') {
          query = this.gradeService.patchGrade({id: $event.gradeId, user_eval: {value: $event.value} });
        } else {
          console.log('event type validation-eval');
          query = this.gradeService.patchGrade({id: $event.gradeId, _validator:$event.userId, validator_eval: {value: $event.value} })
        }
        query.subscribe((result) => {
          if (result.nModified == 1) {
            this.getCatGrade();
          }
        });
      }
    }
  }

}
