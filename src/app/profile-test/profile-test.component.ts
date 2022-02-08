import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-test',
  templateUrl: './profile-test.component.html',
  styleUrls: ['./profile-test.component.css'],
})
export class ProfileTestComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private route: Router) {}
  name_text: any = localStorage.getItem('username');
  num_text: any = localStorage.getItem('number');
  role_text: any = localStorage.getItem('role');
  comp_text: any = localStorage.getItem('company');
  exp_text: any = localStorage.getItem('experience');

  ngOnInit() {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        name_text: new FormControl(this.name_text, [
          Validators.required,
          Validators.minLength(6),
        ]),
        num_text: new FormControl(this.num_text, [Validators.required]),
        role_text: new FormControl(this.role_text, [Validators.required]),
        comp_text: new FormControl(this.comp_text, [Validators.required]),
        exp_text: new FormControl(this.exp_text, [Validators.required]),
      }),
    });

    // this.signupForm = new FormGroup({
    //   userData: new FormGroup({
    //     name_text: new FormControl(null, [Validators.required]),
    //     num_text: new FormControl(null, [Validators.required]),
    //     role_text: new FormControl(null, [Validators.required]),
    //     comp_text: new FormControl(null, [Validators.required]),
    //     exp_text: new FormControl(null, [Validators.required]),
    //   }),
    // });

    // this.signupForm.setValue({
    //   userData: {
    //     name_text: this.name_text,
    //     num_text: this.num_text,
    //     role_text: this.role_text,
    //     comp_text: this.comp_text,
    //     exp_text: this.exp_text,
    //   },
    // });
  }
  // onClear() {
  //   this.signupForm.setValue({
  //     userData: {
  //       name_text: null,
  //       num_text: null,
  //       role_text: null,
  //       comp_text: null,
  //       exp_text: null,
  //     },
  //   });
  // }

  onSubmit() {
    console.log(this.signupForm);
    console.log(this.signupForm.value.userData.name_text);
    localStorage.setItem('username', this.signupForm.value.userData.name_text);
    localStorage.setItem('number', this.signupForm.value.userData.num_text);
    localStorage.setItem('role', this.signupForm.value.userData.role_text);
    localStorage.setItem('company', this.signupForm.value.userData.comp_text);
    localStorage.setItem('experience', this.signupForm.value.userData.exp_text);

    alert('User Details Updated Successfully');
    this.route.navigate(['home']);

    // this.signupForm.reset();
  }

  // onAddHobby() {
  //   const control = new FormControl(null, Validators.required);

  //   (<FormArray>this.signupForm.get('hobbies')).push(control);
  // }

  // forbiddenNames(control: FormControl) {

  //   if (this.forbiddenUsernames.indexOf(control.value) !== -1) {

  //     return {'nameIsForbidden': true};

  //   }

  // }

  // forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
  //   const promise = new Promise<any>((resolve, reject) => {
  //     setTimeout(() => {
  //       if (control.value === 'test@test.com') {
  //         resolve({ emailIsForbidden: true });
  //       } else {
  //         resolve(null);
  //       }
  //     }, 1500);
  //   });

  //   return promise;
  // }
}
function onClear() {
  throw new Error('Function not implemented.');
}
