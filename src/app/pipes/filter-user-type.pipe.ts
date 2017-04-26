import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model';

import { Observable } from 'rxjs/Observable';

@Pipe({
  name: 'filterUserType'
})
export class FilterUserTypePipe implements PipeTransform {

  transform(users: Observable<User[]>, types:any): Observable<any> {
    if (!users) return Observable.of([]);
    return users.map( usersList => usersList.filter( user => types.indexOf(user.type) < 0));
  }

}
