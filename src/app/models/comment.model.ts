import { Category } from './category.model';
import { User } from './user.model';

export class Comment {
  constructor(
    public _id: string,
    public _category: Category,
    public _user: User,
    public content: string,
    public date?: Date
  ) {};

}
