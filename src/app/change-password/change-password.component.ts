import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  @ViewChild('authForm', { static: false })
  signupForm!: NgForm;

  isLoading = false;
  errorData = '';
  error = '';
  email: string = '';
  password: string = '';

  isAuthenticated = false;
  passwordShow = false;
  private userSub!: Subscription;

  check: string = '';
  isShow = false;
  passwordMsg = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });

    this.check = this.authService.sendEmailToComponent();
    console.log(this.check);
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  public togglePassword() {
    if (this.passwordShow) {
      document.getElementById('password')?.setAttribute('type', 'password');

      this.passwordShow = false;
    } else {
      document.getElementById('password')?.setAttribute('type', 'text');
      this.passwordShow = true;
    }
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      this.errorData = 'User Data is invalid!';
      this.isAuthenticated = true;
      return;
    } else {
      this.isShow = true;

      const password = form.value.password;
      console.log(password);

      // let authObs: Observable<AuthResponseData>;

      this.isLoading = true;
      // authObs = this.authService.changePassword(password);

      this.authService.changePassword(password).subscribe(
        (resData: any) => {
          console.log(resData);
          this.isLoading = false;
          this.isShow = true;
          this.passwordMsg = 'Password changed succesfully';
        },
        (errorMessage: any) => {
          console.log(errorMessage);
          this.error = errorMessage;
          this.isLoading = false;
        }
      );
    }
  }
}
