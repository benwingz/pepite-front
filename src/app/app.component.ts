import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DropdownValue } from './common/dropdown/dropdown.component';

import { AuthService } from './service/auth.service';

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
    private authService: AuthService,
  ) {
    // this.dropdownValues = [
    //   new DropdownValue('auto_eval', 'Auto-evaluation', true),
    //   new DropdownValue('validation', 'Validation'),
    //   new DropdownValue('certification_deliver', 'Délivrer un certificat'),
    //   new DropdownValue('certification_download', 'Télécharger un certificat'),
    // ];
  }

  select(value: string) {}

  toggleSidebar(): void {}

  ngOnInit(): void {
    this.authService.userIsLogged$.subscribe(user => {
      if (user) {
        this.currentUser = new User(user._id, user.lastname, user.firstname, user.type);
      } else {
        delete this.currentUser;
      }
    });
  }

  logout(): void{
    this.authService.logout().then((resolve) => {
      if (resolve) {
        this.router.navigate(['login']);
      }
    });
  }
}
