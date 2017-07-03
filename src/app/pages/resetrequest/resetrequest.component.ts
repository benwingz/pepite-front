import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../service/users.service';

@Component({
  selector: 'app-activate',
  templateUrl: './resetrequest.component.html',
  styleUrls: ['./resetrequest.component.scss']
})
export class ResetRequestComponent implements OnInit {

  email: string;
  errorMessage: string;
  successMessage: string;

  constructor(
    private userService: UsersService
  ) {
  }

  ngOnInit() {
  }

  sendRequest() {
    this.userService.requestResetPassword(this.email).subscribe((response) => {
      if (response.success) {
        this.errorMessage = null;
        this.successMessage = 'Le mail de ré-activation de mot de passe à été envoyé, vérifiez votre boîte mail.'
      } else {
        this.successMessage = null;
        this.errorMessage = response.message;
      }
    });
  }

}
