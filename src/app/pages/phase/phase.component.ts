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

  constructor() { }

  ngOnInit() {
  }

}
