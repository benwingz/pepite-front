import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../service/auth.service';

import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  currentUser: User;
  userInfo: any = {};
  errorMessage: String;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.userInfo.email = '';
    this.userInfo.password= '';
  }

  ngOnInit() {
    if(this.authService.getStoredToken()) {
      this.getNewToken({ token: this.authService.getStoredToken() });
    }
  }

  getNewToken(token?:any): void {
    let authInfo:any = {};
    if (token) {
      authInfo = token;
    } else {
      authInfo = this.userInfo;
    }
    this.authService.generateToken(authInfo)
      .then((response) => {
        if(response.success) {
          this.retriveUserProfile().then(
            (user) => {
              this.currentUser = user;
              switch (user.type) {
                // case "user":
                //   this.router.navigate(['home']);
                //   break;
                case "validator":
                  this.router.navigate(['users']);
                  break;
                default:
                  this.router.navigate(['home'])
              }
            }
          );
        } else {
          this.errorMessage = response.message;
        }
      },
      (error) => {
        this.errorMessage = error.error;
      });
  }

  retriveUserProfile(): Promise<any>{
    const authServ = this.authService;
    return new Promise(function(resolve, reject) {
      authServ.getCurrentUser().subscribe(user => {
        resolve(new User(user._id, user.lastname, user.firstname, user.type));
      });
    })
  }

  getRole(): void{}

}
