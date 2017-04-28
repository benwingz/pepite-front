import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UsersService } from '../../service/users.service';

import { User } from '../../models/user.model';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {

  userInfo: User;
  accountId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.accountId = params.id;
      this.usersService.activateUser(params.id).subscribe((user) => {
        if (user._id) {
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

}
