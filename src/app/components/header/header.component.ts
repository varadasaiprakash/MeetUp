import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  private userSub!: Subscription;
  profileContainerEl: any;
  imageEl: any;
  fileEl: any;
  imgEl: any;
  // img: any;
  reader: any;
  choosedFile: any;
  email: string = '';
  isShow = '';
  userClick = false;
  selectedFile = null;
  check: any;
  dataShow = false;
  createBtn: any;
  checkBtn: any;
  errorMsg = '';
  successMsg = '';
  isShow1 = false;
  isShow2 = false;
  // data: any;
  // butText = 'Create User Profile';

  // token: any;
  img: any = '';

  userEmail: any = localStorage.getItem('userEmail');

  name_text: any = localStorage.getItem('username');
  num_text: any = localStorage.getItem('number');
  role_text: any = localStorage.getItem('role');
  comp_text: any = localStorage.getItem('company');
  exp_text: any = localStorage.getItem('experience');

  profile: any;
  constructor(
    private authService: AuthService,
    private route: Router,
    private router: ActivatedRoute
  ) {}
  // token = JSON.parse(localStorage.getItem('userData'))._token;
  testImg: any = localStorage.getItem('img');

  ngOnInit() {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !user;
      console.log(!user);
      console.log(!!user);
    });
    // console.log(this.userData);
    // console.log(this.userData.email);
    // console.log(this.name);

    this.isShow = this.authService.sendTOHeader();
    // this.img = 'https://www.pngitem.com/pimgs/b/78-786293_avatar-png-icon.png';
    // this.data = this.authService.getData();

    this.email = this.authService.sendEmail();
    console.log(this.email);

    //   this.emailEl = email
    // }

    this.profileContainerEl = document.getElementById('profileContainer');
    this.imageEl = document.getElementById('image');

    const show = () => {
      this.profileContainerEl.classList.toggle('visibility');
    };

    this.imageEl.addEventListener('click', show);

    this.imgEl = document.getElementById('photo');
    // this.img = document.getElementById('photo2');
    this.fileEl = document.getElementById('file');

    this.fileEl.addEventListener('change', () => {
      this.choosedFile = this.fileEl.files[0];

      if (this.choosedFile) {
        this.reader = new FileReader();

        this.reader.addEventListener('load', () => {
          this.imgEl.setAttribute('src', this.reader.result);
          this.imageEl.setAttribute('src', this.reader.result);
          this.img = this.reader.result;
          localStorage.setItem('img', this.img);
        });
        this.reader.readAsDataURL(this.choosedFile);
      }
    });
  }

  onClickCreateProfile() {
    // this.userClick = true;
    // this.butText = "check Your Profile";
    // this.userClick = true;
    this.profileContainerEl.classList.toggle('visibility');
    this.checkBtn.classList.add('visible');
    // this.createBtn.classList.add('not-visible');

    this.route.navigate(['profile']);
  }

  onCheckProfile() {
    this.userClick = true;
    // this.profileContainerEl.classList.toggle('visibility');
  }
  onCancel() {
    this.userClick = false;
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  onDelete() {
    this.authService.deleteAccount().subscribe(
      (res: any) => {
        console.log(res);
        alert('Account Deleted Successfully');
        this.route.navigate(['register']);
        // this.successMsg =
        //   'check your email and click on link to reset your password';
        // alert('check Your Email');
        this.isShow1 = true;
        this.isShow2 = false;

        // alert('check your email and click on link to reset your password');
      },
      (err: any) => {
        console.log(err);
        // this.errorMsg = 'Email Does not Exist';
        this.isShow2 = true;
        this.isShow1 = false;
        alert('User Not Found');
      }
    );
  }
  onEdit() {
    this.dataShow = true;
    this.route.navigate(['profileTest']);
  }
}
