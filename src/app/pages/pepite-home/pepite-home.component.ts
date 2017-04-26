import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { PepiteService } from '../../service/pepite.service';

import { Pepite } from '../../models/pepite.model';

@Component({
  selector: 'app-pepite-home',
  templateUrl: './pepite-home.component.html',
  styleUrls: ['./pepite-home.component.css']
})
export class PepiteHomeComponent implements OnInit {

  private currentPepite: Pepite;

  constructor(
    private route: ActivatedRoute,
    private pepiteService: PepiteService
  ) {
    this.route.params.subscribe((params) => {
      this.pepiteService.getPepite(params['id']).subscribe((pepite) => {
        this.currentPepite = pepite;
      });
    });
  }

  ngOnInit() {
  }
}
