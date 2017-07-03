import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UsersService } from '../../service/users.service';

import { User } from '../../models/user.model';

@Component({
  selector: 'app-activate',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  userInfo: User;
  accountId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.accountId = params.id;
    });
  }

}
