import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-meetup-video',
  templateUrl: './meetup-video.component.html',
  styleUrls: ['./meetup-video.component.css']
})
export class MeetupVideoComponent implements OnInit {


  safeUrl: SafeResourceUrl | undefined;

  constructor(private dom: DomSanitizer) { }

  ngOnInit(): void {
    this.safeUrl = this.dom.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/Hk8b32vjbL8")
  }

}
