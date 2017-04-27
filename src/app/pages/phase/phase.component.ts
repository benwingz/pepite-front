import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ReferenceService } from '../../service/reference.service';

import { Phase } from '../../models/phase.model';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-phase',
  templateUrl: './phase.component.html',
  styleUrls: ['./phase.component.scss']
})
export class PhaseComponent implements OnInit {

  private phase_id: string;
  private phase: Phase;
  private categories: Array<Category>;
  private userid: string;

  constructor(
    private route: ActivatedRoute,
    private referenceService: ReferenceService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams) => {
      if (queryParams['user']) {
        this.userid = queryParams['user'];
      }
      this.route.params.subscribe(params => this.phase_id = params['id']);
    });
    this.referenceService.getPhase(this.phase_id)
      .subscribe((phase) => {
        this.phase = phase;
        this.populatePhaseCategories(phase);
      });
  }

  populatePhaseCategories(phase: Phase) {
    this.referenceService.getPhaseCategories(phase)
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

}
