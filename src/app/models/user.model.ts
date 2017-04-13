export class User {
  constructor(public _id: string, public lastname: string, public firstname: string, public type: string, public password?: string, public salt?: string) {};

  getId(): string {
    return this._id;
  }

  getLastname(): string {
    return this.lastname;
  }

  getFirstname(): string {
    return this.firstname;
  }

  getFullname(): string {
    return this.firstname + ' ' + this.lastname;
  }
}
