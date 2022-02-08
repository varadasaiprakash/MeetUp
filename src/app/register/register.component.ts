import { AuthService, AuthResponseData } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Register } from '../register.model';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('authForm', { static: false })
  signupForm!: NgForm;
  loginsDetails: Register[] = [];

  error = '';
  errorData = '';

  email = '';
  password = '';
  isLoading = false;
  errPassword = '';
  passwordShow = false;
  type = 'password';

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginsDetails = this.registerService.getLoginDetails();

    // console.log(this.loginsDetails)
  }

  public togglePassword() {
    if (this.passwordShow) {
      // document.getElementById("password")?.setAttribute("type", "password");
      this.type = 'password';

      this.passwordShow = false;
    } else {
      // document.getElementById("password")?.setAttribute("type", "text");
      this.type = 'text';
      this.passwordShow = true;
    }
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      this.errorData = 'User Data is invalid!';
      return;
    } else {
      this.email = form.value.email;
      this.password = form.value.password;
      console.log(this.email);
      console.log(this.password);
      localStorage.setItem('email', this.email);

      this.authService.sendMailToCheck(this.email);
      // this.authService.getMail(this.email);
      //  localStorage.setItem('email', this.email);
      //  let authObs: Observable<AuthResponseData>;

      this.isLoading = true;
      const data = { email: this.email, password: this.password };
      // authObs = this.authService.signup(email, password);

      this.authService.signup(data).subscribe(
        (resData: any) => {
          console.log(resData);
          console.log(resData.idToken);
          this.isLoading = false;
          // alert("Successfully Registered")
          this.router.navigate(['login']);
        },
        (errorMessage: any) => {
          console.log(errorMessage);
          this.error = errorMessage;
          this.isLoading = false;
        }
      );
      form.reset();
    }
  }
}
