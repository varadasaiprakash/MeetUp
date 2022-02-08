import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  @ViewChild('authForm', { static: false })
  signupForm!: NgForm;

  profileContainerEl: any;
  imageEl: any;
  fileEl: any;
  imgEl: any;
  reader: any;
  choosedFile: any;
  email: string = '';
  isShow = '';
  userClick = true;
  selectedFile = null;
  imgLink: any = localStorage.getItem('imgLink');
  link: any;

  constructor(private authservice: AuthService, private route: Router) {}
  // name: any = localStorage.getItem('username');
  // num: any = localStorage.getItem('number');
  // role: any = localStorage.getItem('role');
  // comp: any = localStorage.getItem('company');
  // exp: any = localStorage.getItem('experience');

  ngOnInit(): void {
    // console.log(this.name);

    // this.signupForm.setValue({
    //   name: this.name,
    //   num: this.num,
    //   role: this.role,
    //   comp: this.comp,
    //   exp: this.exp,
    // });

    // this.signupForm.form.patchValue({
    //   name_text: 'sai',
    // });

    this.profileContainerEl = document.getElementById('profileContainer');
    this.imageEl = document.getElementById('image');
    // this.profileContainerEl.classList.add("block");

    // localStorage.setItem(
    //   'imgLink',
    //   'https://www.pngitem.com/pimgs/b/78-786293_avatar-png-icon.png'
    // );
    // this.imgLink = localStorage.getItem('imgLink');

    const show = () => {
      this.profileContainerEl.classList.toggle('visibility');
    };

    this.imageEl.addEventListener('click', show);

    this.imgEl = document.getElementById('photo2');
    this.fileEl = document.getElementById('file');

    this.fileEl.addEventListener('change', () => {
      this.choosedFile = this.fileEl.files[0];

      if (this.choosedFile) {
        this.reader = new FileReader();

        this.reader.addEventListener('load', () => {
          this.link = this.reader.result;
          console.log(this.link);
          // this.imgEl.setAttribute('src', this.reader.result);
          // this.imageEl.setAttribute('src', this.reader.result);
          // localStorage.setItem('imgLink', this.reader.result);
          // this.imgLink = localStorage.getItem("imgLink")
        });
        this.reader.readAsDataURL(this.choosedFile);
      }
    });
  }

  suggestUserName() {
    const suggestedName = 'Superuser';

    this.signupForm.setValue({
      name_text: suggestedName,

      email: 'varada@gmail.com',

      secret: 'pet',

      questionAnswer: '',

      gender: 'male',
    });

    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName,
      },
    });
  }
  onChange() {
    localStorage.setItem('imgLink', this.link);
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      // this.errorData = 'User Data is invalid!';
      // this.isAuthenticated = true;
      return;
    } else {
      // this.isShow = true;
      console.log(form.value);
      // localStorage.setItem('username', form.value.name_text);
      // localStorage.setItem('number', form.value.num_text);
      // localStorage.setItem('role', form.value.role_text);
      // localStorage.setItem('company', form.value.comp_text);
      // localStorage.setItem('experience', form.value.exp_text);

      // const data = {
      //   userName: form.value.name_text,
      //   mobileNumber: form.value.num_text,
      //   role: form.value.role_text,
      //   company: form.value.comp_text,
      //   experience: form.value.exp_text,
      // };
      // console.log(data);
      // this.authservice.sendData(data);
      alert('User Details Updated Successfully');
      this.route.navigate(['home']);

      //  localStorage.setItem('email', this.email);
    }
  }
}
