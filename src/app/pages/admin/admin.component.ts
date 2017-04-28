import { Component, OnInit } from '@angular/core';

import { PepiteService } from '../../service/pepite.service';

import { Pepite } from '../../models/pepite.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  pepites: Pepite[];
  pepiteAssignMode: boolean = false;
  filterType: Array<string> = [];
  pepiteToPatch: string;

  constructor(
    private pepiteService: PepiteService
  ) { }

  ngOnInit() {
    this.loadPepite();
  }

  loadPepite(): void {
    this.pepiteService.getAllPepites()
      .subscribe( (pepiteList) => {
        this.pepites = pepiteList;
      })
  }

  switchToPepiteAssignMode(pepiteId: string): void{
    this.pepiteToPatch = pepiteId;
    this.pepiteAssignMode = true;
    this.filterType = ['admin', 'user', 'validator'];
  }

  assignPepiteAdmin(userId): void {
    this.pepiteService.assignPepiteAdmin(userId, this.pepiteToPatch)
      .subscribe( (raw) => {
        if (raw.ok) {
          this.loadPepite();
          this.pepiteAssignMode = true;
          this.filterType = [];
          this.pepiteToPatch = null;
        }
      });
  }

}
