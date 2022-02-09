import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    // this.signupForm = new FormGroup({
    //   name_text: new FormControl(this.name_text, [
    //     Validators.required,
    //     Validators.minLength(6),
    //   ]),
    //   num_text: new FormControl(this.num_text, [Validators.required]),
    //   role_text: new FormControl(this.role_text, [Validators.required]),
    //   comp_text: new FormControl(this.comp_text, [Validators.required]),
    //   exp_text: new FormControl(this.exp_text, [Validators.required]),
    // });

    this.signupForm = new FormGroup({
      name_text: new FormControl(null, [Validators.required]),
      num_text: new FormControl(null, [Validators.required]),
      role_text: new FormControl(null, [Validators.required]),
      comp_text: new FormControl(null, [Validators.required]),
      exp_text: new FormControl(null, [Validators.required]),
    });

    this.signupForm.setValue({
      name_text: this.name_text,
      num_text: this.num_text,
      role_text: this.role_text,
      comp_text: this.comp_text,
      exp_text: this.exp_text,
    });
  }

  onSubmit() {
    console.log(this.signupForm);
    console.log(this.signupForm.value.name_text);
    localStorage.setItem('username', this.signupForm.value.name_text);
    localStorage.setItem('number', this.signupForm.value.num_text);
    localStorage.setItem('role', this.signupForm.value.role_text);
    localStorage.setItem('company', this.signupForm.value.comp_text);
    localStorage.setItem('experience', this.signupForm.value.exp_text);

    alert('User Details Updated Successfully');
    this.route.navigate(['home']);

    // this.signupForm.reset();
  }

  get name() {
    return this.signupForm.get('name_text');
  }
  get number() {
    return this.signupForm.get('num_text');
  }
  get role() {
    return this.signupForm.get('role_text');
  }
  get company() {
    return this.signupForm.get('comp_text');
  }
  get experience() {
    return this.signupForm.get('exp_text');
  }
}
