import { Component, OnInit, Input } from '@angular/core';
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

import { FilterUserPipe } from '../../pipes/filteruser.pipe';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  @Input()
  showGrades: boolean = false;
  @Input()
  hideTypes: string[];

  private userList: Observable<User[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private usersService: UsersService,
    private filteruser: FilterUserPipe
  ) { }

  ngOnInit() {
    this.userList = this.populateUserList();

    this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .subscribe((term) => {
        if(term) {
          this.userList = this.searchUser(term);
        } else {
          this.userList = this.populateUserList();
        }
      })
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  searchUser(term: string): Observable<User[]> {
    return this.filteruser.transform(this.userList, term, ['fullname', 'email']);
  }

  populateUserList(): Observable<User[]> {
    return this.usersService.getUsers()
      .map((users) => {
        if (users.length > 0) {
          return users;
        } else {
          return [];
        }
      })
  }

}
