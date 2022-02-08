import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Register } from '../register.model';
import { RegisterService } from '../services/register.service';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css'],
})
export class ChangeEmailComponent implements OnInit {
  @ViewChild('authForm', { static: false })
  signupForm!: NgForm;
  loginsDetails: Register[] = [];
  isLoading = false;
  errorData = '';
  error = '';
  email: string = '';
  password: string = '';

  isAuthenticated = false;
  passwordShow = false;
  private userSub!: Subscription;

  check: string = '';
  errorMsg = '';
  successMsg = '';
  isShow1 = false;
  isShow2 = false;

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private authService: AuthService
  ) {}

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
      // this.isShow = true;
      // const email = form.value.email;
      const email = form.value.email;
      console.log(email);
      // this.authService.sendValidate(this.isShow);
      // this.authService.getMail(email);

      //  localStorage.setItem('email', this.email);

      // let authObs: Observable<AuthResponseData>;

      this.isLoading = true;
      // authObs = this.authService.changePassword(password);

      this.authService.changeEmail(email).subscribe(
        (resData: any) => {
          console.log(resData);
          this.isLoading = false;
          this.successMsg = 'Email changed succesfully';
          this.isShow1 = true;
          this.isShow2 = false;

          // alert('Password changed succesfully');
          // this.router.navigate(['/login']);
          // form.reset();
        },
        (errorMessage: any) => {
          console.log(errorMessage);
          this.errorMsg = 'Email Exists Already';
          this.isLoading = false;
          this.isShow2 = true;
          this.isShow1 = false;
        }
      );
    }
  }
}
