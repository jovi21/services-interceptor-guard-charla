import {Injectable} from '@angular/core';

@Injectable()
export class LoginService {

  private loggedIn: boolean = false;

  constructor() {
  }

  login(credentials: { email: string, pass: string }) {
    /* Code */
  }

  get isLoggedIn() {
    return this.loggedIn
  }

}
