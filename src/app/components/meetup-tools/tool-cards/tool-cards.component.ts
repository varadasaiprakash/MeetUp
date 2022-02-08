import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tool-cards',
  templateUrl: './tool-cards.component.html',
  styleUrls: ['./tool-cards.component.css']
})
export class ToolCardsComponent implements OnInit {
  // img: string = "";
   cards = [
    {
      imgLink: "../../../../assets/images/tool-card-1.png",
      title: "Build Your community",
      description: "Connect with other people who are curious about the things you love.",
      button: "Get started ▶"
    },
    {
      imgLink: "../../../../assets/images/tool-card-2.png",
      title: "Easy hosting tools",
      description: "Chat with members and manage your attendance.",
      button: "Get started ▶"
    },
    {
      imgLink: "../../../../assets/images/tool-card-3.png",
      title: "Host safe events",
      description: "Easy-to-use features for indicating whether events will be outdoors, have mask or vaccination requirements, & more.",
      button: "Get started ▶"
    },
    {
      imgLink: "../../../../assets/images/tool-card-4.png",
      title: "We’ll help you grow",
      description: "Meetup will keep promoting your group throughout its network to get more people interested.",
      button: "Get started ▶"
    }

    ]

  constructor() { }

  ngOnInit(): void {



  }


}
