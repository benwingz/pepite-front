import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UsersService } from '../../service/users.service';

import { User } from '../../models/user.model';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit, OnChanges {

  userInfo: User;
  errorMessage: String;
  studyLevels: Array<number> = [0,1,2,3,4,5,6,7,8];
  accountId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService
  ) {
  }

  ngOnChanges(): void {
    console.log(this.userInfo);
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.accountId = params.id;
      this.usersService.activateUser(params.id).subscribe((user) => {
        console.log('user', user);
        if (user._id) {
          console.log('user', user);
          this.userInfo = user;
        } else {
          this.router.navigate(['login']);
        }
      },
      (err) => {
        console.log(err);
      });
    });
  }

  patchUser(): void{
    console.log(this.userInfo);
    this.usersService.doActivateUser(this.userInfo, this.accountId).subscribe((response) => {
      if(response.nModified) {
        this.router.navigate(['login']);
      } else {
        this.errorMessage = response.message;
      }
    });
  }

}
