import { Category } from './category.model';
import { User } from './user.model';

export class Grade {
  constructor(
    public category: Category,
    public user: User,
    public user_eval: Object,
    public _id?: string,
    public validator?: User,
    public validator_eval?: Object
  ) {};

}
