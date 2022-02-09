import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import { Register } from '../register.model';
import { RegisterService } from '../services/register.service';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('authForm', { static: false })
  mytext!: ElementRef;
  signupForm!: NgForm;
  loginsDetails: Register[] = [];
  isLoading = false;
  errorData = '';
  error = '';
  email: string = '';
  password: string = '';
  isShow = false;
  isAuthenticated = false;
  passwordShow = false;
  private userSub!: Subscription;

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginsDetails = this.registerService.getLoginDetails();
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });
    let email1: any = localStorage.getItem('email');
    console.log(email1);
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
      const email = form.value.email;
      const password = form.value.password;
      console.log(email);
      this.authService.sendValidate(this.isShow);
      this.authService.getMail(email);
      localStorage.setItem('userEmail', email);

      // let authObs: Observable<AuthResponseData>;

      this.isLoading = true;
      // authObs = this.authService.login(email, password);
      const data1 = { email: email, password: password };
      this.authService.login(data1).subscribe(
        (resData: any) => {
          console.log(resData);
          this.isLoading = false;

          this.router.navigate(['/home']);
          form.reset();
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
