import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { PepiteService } from '../../service/pepite.service';
import { UsersService } from '../../service/users.service';

import { Pepite } from '../../models/pepite.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-pepite-home',
  templateUrl: './pepite-home.component.html',
  styleUrls: ['./pepite-home.component.css']
})
export class PepiteHomeComponent implements OnInit {

  private currentPepite: Pepite;
  private addUsersOpen: boolean = false;
  private userInfo:User;
  private errorMessage: string;
  private triggerUserListChange: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pepiteService: PepiteService,
    private usersService: UsersService
  ) {
    this.route.params.subscribe((params) => {
      this.pepiteService.getPepite(params['id']).subscribe((pepite) => {
        this.currentPepite = pepite;
        this.initUserInfo();
      });
    });
  }

  ngOnInit() {
  }

  initUserInfo(): void{
    this.userInfo = new User(null, '', null, null, "user", this.currentPepite._id);
  }

  openUserForm(): void{
    this.addUsersOpen = true;
  }

  submitUsersForm(): void{
    if (this.userInfo && this.userInfo.email != "") {
      this.usersService.createUser(this.userInfo).subscribe( (response) => {
        console.log(response);
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
}
