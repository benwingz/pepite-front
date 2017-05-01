import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { ReferenceService } from '../../service/reference.service';
import { NavigationService } from '../../service/navigation.service';

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
    private router: Router,
    private referenceService: ReferenceService,
    private navService: NavigationService,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams) => {
      if (queryParams['user']) {
        this.userid = queryParams['user'];
      }
      this.route.params.subscribe(params => this.phase_id = params['id']);
    });

    this.getPhase(this.phase_id);
  }

  getPhase(phaseId): void{
    this.referenceService.getPhase(phaseId)
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

  previousPhase(): void{
    this.phase_id = this.navService.getPreviousPhase(this.phase_id);
    this.getPhase(this.phase_id);
    this.router.navigate(['/phase', this.phase_id]);
  }

  nextPhase(): void{
    this.phase_id = this.navService.getNextPhase(this.phase_id);
    this.getPhase(this.phase_id);
    this.router.navigate(['/phase', this.phase_id]);
  }

}
