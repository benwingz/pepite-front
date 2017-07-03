import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { PepiteService } from '../../service/pepite.service';
import { UsersService } from '../../service/users.service';
import { AuthService } from '../../service/auth.service';

import { Pepite } from '../../models/pepite.model';
import { User } from '../../models/user.model';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-pepite-home',
  templateUrl: './pepite-home.component.html',
  styleUrls: ['./pepite-home.component.scss']
})
export class PepiteHomeComponent implements OnInit {

  private currentPepite: Pepite;
  private addUsersOpen: boolean = false;
  private userInfo:User;
  private errorMessage: string;
  private triggerUserListChange: number = 0;
  private userList: Observable<User>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pepiteService: PepiteService,
    private usersService: UsersService,
    private authService: AuthService
  ) {

  }

  ngOnInit() {
    this.authService.getUser().subscribe((user) => {
      if (['admin','pepite-admin'].indexOf(user.type) == -1) {
        this.router.navigate(['login']);
      }
    });
    this.route.params.subscribe((params) => {
      this.pepiteService.getPepite(params['id']).subscribe((pepite) => {
        this.currentPepite = pepite;
        this.initUserList();
        this.initUserInfo();
      });
    });
  }

  initUserList(): void{
    this.userList = this.usersService.getUsers(null, this.currentPepite._id);
  }

  initUserInfo(): void{
    if( this.currentPepite) {
      this.userInfo = new User(null, '', null, null, "user", this.currentPepite._id);
    }
  }

  openUserForm(): void{
    this.addUsersOpen = true;
  }

  submitUsersForm(): void{
    if (this.userInfo && this.userInfo.email != "") {
      this.usersService.createUser(this.userInfo).subscribe( (response) => {
        if (response.success) {
          this.addUsersOpen = false;
          this.initUserList();
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
