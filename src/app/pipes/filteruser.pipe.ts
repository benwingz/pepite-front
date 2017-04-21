import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model';

import { Observable } from 'rxjs/Observable';

@Pipe({
  name: 'filteruser'
})
export class FilterUserPipe implements PipeTransform {

  constructor() {

  }

  transform(users: Observable<User[]>, searchTerms): Observable<User[]> {
    return users.map( (userList) => {
      let filterList: User[] = [];
      for (let i = 0; i < userList.length; i++) {
        if (userList[i].getFullname().indexOf(searchTerms) > -1) {
          filterList.push(userList[i]);
        }
      }
      if(searchTerms == '') {
        return users;
      } else {
        return filterList;
      }
    });
  }
}
