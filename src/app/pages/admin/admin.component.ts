import { Component, OnInit } from '@angular/core';

import { PepiteService } from '../../service/pepite.service';
import { UsersService } from '../../service/users.service';

import { Pepite } from '../../models/pepite.model';
import { User } from '../../models/user.model';

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
  addUsersOpen: boolean = false;
  addPepiteOpen: boolean = false;
  userInfo: User;
  errorMessage: string;
  triggerUserListChange: number = 0;
  newPepite: Pepite;

  constructor(
    private pepiteService: PepiteService,
    private usersService: UsersService
  ) {
    this.initUserInfo();
    this.initNewPepite();
  }

  initNewPepite(): void{
    this.newPepite = new Pepite(null, null, null, null);
  }

  initUserInfo(): void{
    this.userInfo = new User(null, '', null, null, "user");
  }

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

  toggleUserForm(): void{
    this.addUsersOpen = !this.addUsersOpen;
  }

  togglePepiteForm(): void{
    this.addPepiteOpen = !this.addPepiteOpen;
  }

  submitUsersForm(): void {
    this.errorMessage = null;
    if (this.userInfo && this.userInfo.email != "") {
      this.usersService.createUser(this.userInfo).subscribe( (response) => {
        if (response.success) {
          this.addUsersOpen = false;
          this.initUserInfo()
          this.triggerUserListChange ++;
        } else {
          this.errorMessage = response.message;
        }
      });
    } else {
      this.errorMessage = 'Veuillez rentrer un email';
    }
  }

  submitPepiteForm(): void{
    this.errorMessage = null;
    if (this.newPepite && this.newPepite.name) {
      this.pepiteService.createPepite(this.newPepite)
        .subscribe((response) => {
          if (response.success) {
            this.loadPepite();
            this.addPepiteOpen = false;
          } else {
            this.errorMessage = response.message;
          }
        });
    }
  }

  deletePepite(pepiteId: string): void{
    this.errorMessage = null;
    this.pepiteService.deletePepite(pepiteId)
      .subscribe((response) => {
        if (response.success) {
          this.loadPepite();
        } else {
          this.errorMessage = response.message;
        }
      })
  }

}
