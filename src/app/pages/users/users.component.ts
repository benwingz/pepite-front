import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsersService } from '../../service/users.service';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { User } from '../../models/user.model';

import { FilterUserPipe } from '../../pipes/filteruser.pipe'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  validatorUserList: Observable<User[]>;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.validatorUserList = this.usersService.getUsers(params.id)
        .map((users) => {
          console.log('users', users);
          if (users.length > 0) {
            return users;
          } else {
            return [];
          }
        })
    })
  }

}
