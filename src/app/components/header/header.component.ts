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

  testImg: any = localStorage.getItem('img');

  ngOnInit() {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !user;
      console.log(!user);
      console.log(!!user);
    });

    this.isShow = this.authService.sendTOHeader();

    this.email = this.authService.sendEmail();
    console.log(this.email);

    this.profileContainerEl = document.getElementById('profileContainer');
    this.imageEl = document.getElementById('image');

    const show = () => {
      this.profileContainerEl.classList.toggle('visibility');
    };

    this.imageEl.addEventListener('click', show);

    this.imgEl = document.getElementById('photo');
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
    this.profileContainerEl.classList.toggle('visibility');
    this.checkBtn.classList.add('visible');

    this.route.navigate(['profile']);
  }

  onCheckProfile() {
    this.userClick = true;
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
        this.isShow1 = true;
        this.isShow2 = false;
      },
      (err: any) => {
        console.log(err);
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
