import { Component, OnChanges , Input, Output, EventEmitter } from '@angular/core';

import { Grade } from '../../models/grade.model';
import { Category } from '../../models/category.model';
import { User } from '../../models/user.model';

import { GradeService } from '../../service/grade.service';
import { AuthService } from '../../service/auth.service';

export const NUMBER_STAR = 4;

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.scss']
})

export class GradeComponent implements OnChanges {
  private hoverValue: number = 0;
  @Input()
  private readOnly: boolean;

  @Input()
  private grade: Grade;
  @Input()
  private category: Category;

  private user: User;
  private validationLegend: Boolean = false;
  private emptyGrade: boolean = false;


  @Output()
  gradeEvent = new EventEmitter();

  constructor(
    private gradeService: GradeService,
    private authService: AuthService
  ) {
  }

  createEmptyGrade(): Grade {
    return new Grade(
      this.category,
      this.user,
      {value: 0},
      null,
      null,
      {value: 0}
    );
  }

  changeGrade(value: number): void {
    if (!this.readOnly) {
      this.gradeEvent.emit({
        gradeId: (!this.emptyGrade)? this.grade._id: null,
        value: value,
        userId: this.user._id,
        categoryId: this.category._id,
        emptyGrade: this.emptyGrade
      });
      if(this.emptyGrade) {
        this.emptyGrade = false;
      }
    }
  }

  removeGrade(): void {
    this.gradeService.removeGrade(this.grade)
      .subscribe((result) => {
        if(result.success) {
          this.emptyGrade = true;
          this.grade = this.createEmptyGrade();
        }
      });
  }

  changeHover(value: number) {
    if (!this.readOnly) {
      this.hoverValue = value;
    }
  }

  toggleValidationLegend(event): void {
    event.stopPropagation();
    this.validationLegend = !this.validationLegend;
  };


  createRange(): number[] {
    let items: number[] = [];
    for (let i = 1; i <= NUMBER_STAR; i++) {
      items.push(i);
    }

    return items;
  }

  ngOnChanges() {
    this.user = this.authService.currentUser;
    if (!this.grade) {
      this.emptyGrade = true;
      this.grade = this.createEmptyGrade();
    } else {
      this.emptyGrade = false;
    }
  }

}
