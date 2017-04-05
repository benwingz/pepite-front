export class Category {
constructor(public _id: string, public title: string, public skills: string[], public order: number) {};

  getId(): string {
    return this._id;
  }

  getTitle(): string {
    return this.title;
  }

  getSkills(): string[] {
    return this.skills;
  }
}
