import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

import { User } from '../auth.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  // msg = null;
  user = new BehaviorSubject<any>(null);
  private tokenExpirationTimer: any;

  email: string = '';
  check: string = '';
  // password: string = ""
  isShow = '';
  item: any;
  errorMessage: any;
  data: any;
  constructor(private http: HttpClient, private router: Router) {}

  sendMailToCheck(email: string) {
    this.check = email;
    // console.log(this.check);
  }

  sendEmailToComponent() {
    return this.check;
  }

  // signup(email: string, password: string) {
  //   return this.http
  //     .post<AuthResponseData>(
  //       'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAmi0jqUFZn9tnF3AB3PQLgVjX3nEnleFg',
  //       {
  //         email: email,
  //         password: password,
  //         returnSecureToken: true
  //       }
  //     )
  //     .pipe(
  //       catchError(this.handleError),
  //       // tap(resData => {
  //       //   this.handleAuthentication(
  //       //     resData.email,
  //       //     resData.localId,
  //       //     resData.idToken,
  //       //     +resData.expiresIn
  //       //   );
  //       // })
  //     );
  // }

  getMail(email: string) {
    this.email = email;
  }
  sendValidate(show: any) {
    this.isShow = show;
  }

  sendTOHeader() {
    return this.isShow;
  }

  sendEmail() {
    return this.email;
  }

  sendData(data: any) {
    this.data = data;
  }

  getData() {
    return this.data;
  }

  signup(data: any): any {
    return (
      this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAmi0jqUFZn9tnF3AB3PQLgVjX3nEnleFg',
          {
            email: data.email,
            password: data.password,
            returnSecureToken: true,
          }
        )
        // .pipe(
        //   catchError(errorRes => {
        //     let errorMessage = 'An unknown error occurred!';
        //     if (!errorRes.error || !errorRes.error.error) {
        //       return throwError(errorMessage);
        //     }
        //     switch (errorRes.error.error.message) {
        //       case 'EMAIL_EXISTS':
        //         errorMessage = 'This email exists already';
        //     }
        //     return throwError(errorMessage);
        //   })
        // );
        .pipe(
          catchError(this.handleError),
          tap((resData) => {
            this.handleAuthentication(
              resData.email,
              resData.localId,
              resData.idToken,
              +resData.expiresIn
            );
          })
        )
    );
  }

  login(data1: any): any {
    return (
      this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAmi0jqUFZn9tnF3AB3PQLgVjX3nEnleFg',
          {
            email: data1.email,
            password: data1.password,
            returnSecureToken: true,
          }
        )
        // .pipe(
        //   catchError(errorRes => {
        //     let errorMessage = 'An unknown error occurred!';
        //     if (!errorRes.error || !errorRes.error.error) {
        //       return throwError(errorMessage);
        //     }
        //     switch (errorRes.error.error.message) {
        //       case 'EMAIL_NOT_FOUND':
        //         errorMessage = 'This email does not exist.';
        //         break;
        //       case 'INVALID_PASSWORD':
        //         errorMessage = 'This password is not correct.';
        //         break;
        //     }
        //     return throwError(errorMessage);
        //   })
        // );
        .pipe(
          catchError(this.handleError),
          tap((resData) => {
            this.handleAuthentication(
              resData.email,
              resData.localId,
              resData.idToken,
              +resData.expiresIn
            );
          })
        )
    );
  }

  logout() {
    this.user.next(null);
    alert("You're Logout");
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  changePassword(password: string): any {
    console.log(password);
    this.item = localStorage.getItem('userData');
    console.log(this.item);
    const userData: { _token: string } = JSON.parse(this.item);
    console.log(userData._token);

    return (
      this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAmi0jqUFZn9tnF3AB3PQLgVjX3nEnleFg',
          {
            // email: email,
            idToken: userData._token,
            password: password,
            returnSecureToken: true,
          }
        )
        // .pipe(
        //   catchError((errorRes) => {
        //     let errorMessage = 'An unknown error occurred!';
        //     if (!errorRes.error || !errorRes.error.error) {
        //       return throwError(errorMessage);
        //     }
        //     switch (errorRes.error.error.message) {
        //       case 'WEAK_PASSWORD':
        //         errorMessage = 'This password is less than 6 letters.';
        //     }
        //     return throwError(errorMessage);
        //   })
        // );
        .pipe(
          catchError(this.handleError)
          // tap((resData) => {
          //   this.handleAuthentication(
          //     resData.email,
          //     resData.localId,
          //     resData.idToken,
          //     +resData.expiresIn
          //   );
          // })
        )
    );
  }

  changeEmail(email: string): any {
    console.log(email);
    this.item = localStorage.getItem('userData');
    console.log(this.item);
    const userData: { _token: string } = JSON.parse(this.item);
    console.log(userData._token);

    return (
      this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAmi0jqUFZn9tnF3AB3PQLgVjX3nEnleFg',
          {
            // email: email,
            idToken: userData._token,
            email: email,
            returnSecureToken: true,
          }
        )
        // .pipe(
        //   catchError((errorRes) => {
        //     let errorMessage = 'An unknown error occurred!';
        //     if (!errorRes.error || !errorRes.error.error) {
        //       return throwError(errorMessage);
        //     }
        //     switch (errorRes.error.error.message) {
        //       case 'WEAK_PASSWORD':
        //         errorMessage = 'This password is less than 6 letters.';
        //     }
        //     return throwError(errorMessage);
        //   })
        // );
        .pipe(
          catchError(this.handleError)
          // tap((resData) => {
          //   this.handleAuthentication(
          //     resData.email,
          //     resData.localId,
          //     resData.idToken,
          //     +resData.expiresIn
          //   );
          // })
        )
    );
  }

  deleteAccount(): any {
    this.item = localStorage.getItem('userData');
    console.log(this.item);
    const userData: { _token: string } = JSON.parse(this.item);
    console.log(userData._token);

    return (
      this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyAmi0jqUFZn9tnF3AB3PQLgVjX3nEnleFg',
          {
            // email: email,
            idToken: userData._token,
          }
        )
        // .pipe(
        //   catchError((errorRes) => {
        //     let errorMessage = 'An unknown error occurred!';
        //     if (!errorRes.error || !errorRes.error.error) {
        //       return throwError(errorMessage);
        //     }
        //     switch (errorRes.error.error.message) {
        //       case 'WEAK_PASSWORD':
        //         errorMessage = 'This password is less than 6 letters.';
        //     }
        //     return throwError(errorMessage);
        //   })
        // );
        .pipe(
          catchError(this.handleError)
          // tap((resData) => {
          //   this.handleAuthentication(
          //     resData.email,
          //     resData.localId,
          //     resData.idToken,
          //     +resData.expiresIn
          //   );
          // })
        )
    );
  }

  forgetPassword(email: string): any {
    return (
      this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAmi0jqUFZn9tnF3AB3PQLgVjX3nEnleFg',
          {
            requestType: 'PASSWORD_RESET',
            email: email,
          }
        )
        // .pipe(
        //   catchError(errorRes => {
        //     let errorMessage = 'An unknown error occurred!';
        //     if (!errorRes.error || !errorRes.error.error) {
        //       return throwError(errorMessage);
        //     }
        //     switch (errorRes.error.error.message) {
        //       case 'EMAIL_EXISTS':
        //         errorMessage = 'This email exists already';
        //     }
        //     return throwError(errorMessage);
        //   })
        // );
        .pipe(
          catchError(this.handleError)
          // tap((resData) => {
          //   this.handleAuthentication(
          //     resData.email,
          //     resData.localId,
          //     resData.idToken,
          //     +resData.expiresIn
          //   );
          // })
        )
    );
  }

  // updateProfile(data: any): any {
  //   this.item = localStorage.getItem('userData');
  //   console.log(this.item);
  //   const userData: { _token: string } = JSON.parse(this.item);
  //   return (
  //     this.http
  //       .post<AuthResponseData>(
  //         'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAmi0jqUFZn9tnF3AB3PQLgVjX3nEnleFg',
  //         {
  //           idToken: userData._token,
  //           userName: data.name_text,
  //           mobileNumber: data.num_text,
  //           role: data.role_text,
  //           company: data.comp_text,
  //           experience: data.exp_text,
  //           returnSecureToken: true,
  //         }
  //       )
  //       // .pipe(
  //       //   catchError(errorRes => {
  //       //     let errorMessage = 'An unknown error occurred!';
  //       //     if (!errorRes.error || !errorRes.error.error) {
  //       //       return throwError(errorMessage);
  //       //     }
  //       //     switch (errorRes.error.error.message) {
  //       //       case 'EMAIL_EXISTS':
  //       //         errorMessage = 'This email exists already';
  //       //     }
  //       //     return throwError(errorMessage);
  //       //   })
  //       // );
  //       .pipe(
  //         catchError(this.handleError),
  //         tap((resData) => {
  //           this.handleAuthentication(
  //             resData.email,
  //             resData.localId,
  //             resData.idToken,
  //             +resData.expiresIn
  //           );
  //         })
  //       )
  //   );
  // }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    return localStorage.setItem('userData', JSON.stringify(user));

    // this.item = localStorage.getItem('userData');
    // console.log(this.item);
  }

  // var a = ({ _token: string } = this.item);

  autoLogin() {
    this.item = localStorage.getItem('userData');
    console.log(this.item);
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(this.item);
    // console.log(JSON.parse(this.item));

    // console.log(userData.email);
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage: string = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email is not registered.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
      case 'WEAK_PASSWORD':
        errorMessage = 'This password is less than 6 letters.';
        break;
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already.';
        break;
    }
    return throwError(errorMessage);
  }
}
