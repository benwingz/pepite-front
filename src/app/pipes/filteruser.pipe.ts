import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model';

import { Observable } from 'rxjs/Observable';

@Pipe({
  name: 'filteruser'
})
export class FilterUserPipe implements PipeTransform {

  constructor() {

  }

  transform(users: Observable<User[]>, searchTerms, filtersProperties?: string[]): Observable<User[]> {
    return users.map( (userList) => {
      let filterList: User[] = [];
      for (let i = 0; i < userList.length; i++) {
        if (filtersProperties) {
          for (let y=0; y < filtersProperties.length; y++) {
            let userTested = userList[i];
            if (userTested[filtersProperties[y]].indexOf(searchTerms) > -1) {
              filterList.push(userList[i]);
            }
          }
        } else {
          if (userList[i].fullname.indexOf(searchTerms) > -1) {
            filterList.push(userList[i]);
          }
        }
      }
      if(searchTerms == '') {
        return users;
      } else {
        filterList = filterList.filter(function(elem, index, self) {
          return index == self.indexOf(elem);
        });
        return filterList;
      }
    });
  }
}
