import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ReferenceService } from '../../service/reference.service';

import { Phase } from '../../models/phase.model';

@Component({
  selector: 'app-phase',
  templateUrl: './phase.component.html',
  styleUrls: ['./phase.component.css']
})
export class PhaseComponent implements OnInit {

  private phase_id: string;

  constructor(
    private route: ActivatedRoute,
    private referenceService: ReferenceService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.phase_id = params['id']);
    this.referenceService.getPhase(this.phase_id)
      .subscribe(phase => console.log('phase', phase));
  }

}
