export class User {
  public fullname: string;

  constructor(
    public _id: string,
    public email: string,
    public lastname: string,
    public firstname: string,
    public type: string,
    public _pepite?: string,
    public _validator?: string,
    public password?: string,
    public salt?: string) {
    this.fullname = this.getFullname();
  };

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
