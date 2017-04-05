import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DropdownValue } from './common/dropdown/dropdown.component';

import { SessionService } from './service/session.service';
import { UserService } from './service/user.service';

import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUser: User = null;
  title = 'Pépite';
  private dropdownValues: DropdownValue [];
  private sidebarShown: Boolean = false;

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private userService: UserService
  ) {
    this.dropdownValues = [
      new DropdownValue('auto_eval', 'Auto-evaluation', true),
      new DropdownValue('validation', 'Validation'),
      new DropdownValue('certification_deliver', 'Délivrer un certificat'),
      new DropdownValue('certification_download', 'Télécharger un certificat'),
    ];
  }

  select(value: string) {}

  toggleSidebar(): void {}

  ngOnInit(): void {
    this.sessionService.generateToken({token : this.sessionService.getStoredToken()})
      .then((token) => {
        if(token) {
          this.retriveUserProfile();
          this.router.navigate(['home']);
        } else {
          //go to login page
        }
      });
  }

  retriveUserProfile(): void{
    this.userService.getCurrentUser().subscribe(user => {
      this.currentUser = new User(user._id, user.lastname, user.firstname, user.password, user.salt);
    });
  }

  getRole(): void{}
}
