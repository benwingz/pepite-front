import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ReferenceService } from '../../service/reference.service';
import { GradeService } from '../../service/grade.service';

import { Phase } from '../../models/phase.model';
import { Category } from '../../models/category.model';
import { Grade } from '../../models/grade.model';

@Component({
  selector: 'app-global-phase',
  templateUrl: './global-phase.component.html',
  styleUrls: ['./global-phase.component.scss'],
})
export class GlobalPhaseComponent implements OnInit {

  @Input()
  private phase: Phase;
  private categories: Category[];
  private categoriesGrade: Object[] = [];
  private hidden: boolean;
  private expand: string;
  private icons: string[] = [
    'work',
    'explore',
    'build',
    'play_circle_outline'
  ];
  @Input()
  private phaseNumber: number;
  @Input()
  private detailShown: boolean;

  constructor(
    private referenceService: ReferenceService,
    private gradeService: GradeService
  ) {
  }

  ngOnInit() {
    this.hidden = true;
    this.expand = 'add';

    this.referenceService.getPhaseCategories(this.phase)
      .subscribe((categories) => {
        this.categories = categories;
        categories.map((category) => {
          this.getCategoryGrade(category)
            .subscribe(grade => this.categoriesGrade[category._id] = grade[0]);
        });
      });
  }

  getCategoryGrade(category): Observable<any>{
      return this.gradeService.getCategoryGrades(category);
  }

  toggle(event): void {
    event.stopPropagation();
    this.hidden = !this.hidden;
    if (this.hidden === false) {
      this.expand = 'remove';
    } else {
      this.expand = 'add';
    }
  }
}
