import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-special-cards',
  templateUrl: './special-cards.component.html',
  styleUrls: ['./special-cards.component.css']
})
export class SpecialCardsComponent implements OnInit {

  constructor() { }

  cards = [
    {
      imgLink: "../../../../assets/images/special-card-img-1.jpg",
      title: "Make new friends",
      description: "When we do things together, it’s that much more fun. Meetup is the most powerful tool for growing your community and connecting with friends."
    },
    {
      imgLink: "../../../../assets/images/special-card-img-2.jpg",
      title: "Invest in a better you",
      description: "Join millions of others who have built their yoga or meditation practice, formed fitness groups, or aligned on common interests related to wellness and spirituality."
    },
    {
      imgLink: "../../../../assets/images/special-card-img-4.jpg",
      title: "Raise your profile",
      description: "It’s the perfect time to hone your skills or meet your next business partner. Connect with people who can help you launch your startup, small business, or tech venture. Create the group you’ve always wanted to join."
    },
    {
      imgLink: "../../../../assets/images/special-card-img-4.jpg",
      title: "Share your gift",
      description: "What lights you up the most? Join millions of others around the world who are starting and joining groups devoted to their favorite activities like photography, music, writing, art, and more. You never know where it might lead."
    }

  ]

  ngOnInit(): void {
  }

}
