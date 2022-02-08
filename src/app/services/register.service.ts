import { Injectable } from '@angular/core';
import { Register } from '../register.model';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  email: string = '';

  private logins: Register[] = [
    new Register(
      'https://secure.meetupstatic.com/next/images/login/facebook.svg?w=32',
      'Continue with Facebook'
    ),
    new Register(
      'https://secure.meetupstatic.com/next/images/login/google.svg?w=32',
      'Continue with Google'
    ),
    new Register(
      'https://secure.meetupstatic.com/next/images/login/apple.svg?w=32',
      'Continue with Apple'
    ),
    new Register(
      'https://secure.meetupstatic.com/next/images/login/email.svg?w=32',
      'Siun Up with email'
    ),
  ];

  constructor() {}

  getLoginDetails() {
    return this.logins.slice();
  }

  sendMailToCheck(email: string) {
    this.email = email;
  }

  sendToCheck() {
    return this.email;
  }
}
