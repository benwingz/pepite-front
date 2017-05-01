import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

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
export class UserlistComponent implements OnInit, OnChanges {

  @Input()
  showGrades: boolean = false;
  @Input()
  displayValidator: boolean = false;
  @Input()
  hideTypes: string[] = [];
  @Input()
  externalUserList: Observable<User[]>;
  @Input()
  changeUserList: number;
  @Input()
  assignPepite: boolean = false;
  @Input()
  chartStyle: string = 'inline';
  @Input()
  clickToAccess: boolean = false;
  @Input()
  showUserHanlder: boolean = false;
  @Output()
  emittUserId = new EventEmitter();


  private oldTypeFilter: Array<string>;
  private assignMode: boolean = false;
  private userAssignatedId: string;
  private changeUserListOld: number = 0;
  private userList: Observable<User[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private router: Router,
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

  ngOnChanges() {
    if (this.changeUserList > this.changeUserListOld) {
      this.changeUserListOld = this.changeUserList;
      this.userList = this.populateUserList();
    }
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  searchUser(term: string): Observable<User[]> {
    return this.filteruser.transform(this.populateUserList(), term, ['fullname', 'email', 'ine']);
  }

  populateUserList(): Observable<User[]> {
    if (this.externalUserList) {
      return this.externalUserList;
    } else {
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

  validatorAssign(userId): void {
    this.oldTypeFilter = this.hideTypes;
    this.hideTypes = ['admin', 'pepite-admin', 'user'];
    this.assignMode = true;
    this.userAssignatedId = userId;
  }

  doAssignValidator(validatorId): void {
    this.usersService.assignValidator(this.userAssignatedId, validatorId)
      .subscribe( (response) => {
        if (response.ok) {
          this.hideTypes = this.oldTypeFilter;
          this.assignMode = false;
          this.userAssignatedId = null;
        }
      });
  }

  goToUser(user: User, access?: boolean): void {
    const haveAccess = (access) ? access: this.clickToAccess;
    if (!this.assignMode && !this.assignPepite && haveAccess && user.type!='admin') {
      switch (user.type) {
        case 'validator':
          this.router.navigate(['/users', user._id]);
          break;
        case 'pepite-admin':
          this.router.navigate(['/pepite', user._pepite]);
          break;
        default:
          this.router.navigate(['/user', user._id]);
      }
    } else if (this.assignPepite) {
      this.emittUserId.emit(user._id);
    }
  }

  deleteUser(user: User): void {
    this.usersService.deleteUser(user._id)
      .subscribe( (response) => {
        if(response.success) {
          this.userList = this.populateUserList();
        }
      })
  }

  editUser(user: User): void {
    
  }

}
