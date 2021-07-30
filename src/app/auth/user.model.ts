export class UserModel {
  constructor(private email: string,
              public id: string,
              private _token: string,
              private _tokenExpirationDate: Date
  ) {

  }


//getter (special type of property)
  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this.token;
  }

}
