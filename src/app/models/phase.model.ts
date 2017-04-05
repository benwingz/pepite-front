import { Category } from './category.model';
import { Grade } from './grade.model';

export class Phase {

  public categories: Array<Category>;
  public grades: Array<Grade>;

  constructor(public _id: number, public title: string, public order: number) {};

  getId(): number {
    return this._id;
  }

  getTitle(): string {
    return this.title;
  }

  getOrder(): number {
    return this.order;
  }

  setCategories(categories: Array<Category>) {
    this.categories = categories;
  }

  getCategories() {
    return this.categories;
  }

  setGrades(grades: Array<Grade>) {
    this.grades = grades;
  }

  getGrades() {
    return this.grades;
  }
}
