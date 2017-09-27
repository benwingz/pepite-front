import { Component, OnInit, Input } from '@angular/core';

import { ReferenceService } from '../../service/reference.service';
import { GradeService } from '../../service/grade.service';

import { Category } from '../../models/category.model';
import { Grade } from '../../models/grade.model';

@Component({
  selector: 'app-userstat',
  templateUrl: './userstat.component.html',
  styleUrls: ['./userstat.component.scss'],
})
export class UserstatComponent implements OnInit {

  @Input()
  user: string;
  @Input()
  hideCategories: boolean = false;
  @Input()
  display: string = 'inline';
  categories: Category[];
  grades: Grade[];
  public doughnutChartLabels:string[] = ['Non évaluées', 'Auto-évaluées', 'Validées'];
  public doughnutChartData:number[] = [];
  public doughnutChartType:string = 'doughnut';

  constructor(
    private referenceService: ReferenceService,
    private gradeService: GradeService
  ) {}

  ngOnInit(): void {
    this.referenceService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });

    this.gradeService.getGrades(this.user).subscribe((grades) => {
      this.grades = grades;
    });
  }

}
