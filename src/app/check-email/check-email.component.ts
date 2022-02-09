import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RegisterService } from 'src/app/services/register.service';
import { AuthResponseData, AuthService } from 'src/app/services/auth.service';
import { Register } from 'src/app/register.model';

@Component({
  selector: 'app-check-email',
  templateUrl: './check-email.component.html',
  styleUrls: ['./check-email.component.css'],
})
export class CheckEmailComponent implements OnInit {
  check: any;
  @ViewChild('authForm', { static: false })
  signupForm!: NgForm;

  isLoading = false;
  errorData = '';

  email: string = '';
  password: string = '';

  isAuthenticated = false;
  passwordShow = false;

  errorMsg = '';
  successMsg = '';
  isShow1 = false;
  isShow2 = false;

  private userSub!: Subscription;

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
      const email = form.value.email;
      console.log(email);

      this.authService.forgetPassword(email).subscribe(
        (res: any) => {
          console.log(res);

          this.successMsg =
            'check your email and click on link to reset your password';

          this.isShow1 = true;
          this.isShow2 = false;
        },
        (err: any) => {
          console.log(err);
          this.errorMsg = 'Email Does not Exist';
          this.isShow2 = true;
          this.isShow1 = false;
        }
      );
    }
  }
}
