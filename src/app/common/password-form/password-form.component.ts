import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UsersService } from '../../service/users.service';

import { User } from '../../models/user.model';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss']
})
export class PasswordFormComponent implements OnInit {

  @Input()
  account: string;
  @Input()
  redirectRoute: string = 'login'

  errorMessage: String;
  successMessage: String;
  accountId: string;
  password: string;
  passwordvalidate:string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService
  ) { }

  ngOnInit() {

  }

  patchPassword(): void{
    if (this.password == this.passwordvalidate) {
      this.usersService.doResetPassword(this.password, this.account).subscribe((response) => {
        if(response.nModified) {
          this.errorMessage = null;
          this.successMessage = "Mot de passe ré-initialisé";
          this.router.navigate([this.redirectRoute]);
        } else {
          this.errorMessage = response.message;
        }
      });
    } else {
      this.errorMessage = 'Les mots de passe ne correspondent pas';
    }
  }

}
