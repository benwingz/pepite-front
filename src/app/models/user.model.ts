export class User {
  constructor(public _id: number, public lastname: string, public firstname: string, public password: string, public salt: string) {};

  getId(): number {
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
