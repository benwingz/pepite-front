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
    this.gradeService.getCategoryGrades(this.category)
      .subscribe((grades) => {
        if (grades.length > 0) {
          this.categoryGrade = grades[0];
        }
      })
    this.focused = false;
    this.buttonBool = false;
  };

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
  //  this.profileProvider.getCurrentProfile().addGrade(this.userProvider.getCurrentUser(), this.category, $event.value);
  }

}
