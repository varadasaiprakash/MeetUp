import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  word: string = "";
  imgLink: string = "";

  constructor() { }

  ngOnInit(): void {


var words = ["communities", "habits", "passions", "interests", "hobbies"];
var count = 0;

    const changeWord = () => {

    var current_word = words[count];
    // console.log(current_word);
    this.word= current_word;
    count++;
    if (count == words.length) { count = 0; }
}

changeWord();
setInterval(changeWord, 2000);

var images = [
  "https://v.fastcdn.co/u/f91f856b/60156740-0-slide-4.jpg",
  "https://v.fastcdn.co/u/f91f856b/60156725-0-slide-6.jpg",
  "https://v.fastcdn.co/u/f91f856b/60142610-0-slide-1.jpg",
  "https://v.fastcdn.co/u/f91f856b/60142600-0-slide-3.jpg",
  "https://v.fastcdn.co/u/f91f856b/60141425-0-slide-4.jpg",
  "https://v.fastcdn.co/u/f91f856b/60141410-0-slide-6.jpg",
  "https://v.fastcdn.co/u/f91f856b/60141395-0-slide-1.jpg",
  "https://v.fastcdn.co/u/f91f856b/60139320-0-slide-5.jpg",
  "https://v.fastcdn.co/u/f91f856b/60139305-0-slide-1.jpg"

]
var imgCount = 0;


const changeImage = () => {

  var current_image = images[imgCount];
  // console.log(current_image);
  this.imgLink= current_image;
  imgCount++;
  if (imgCount == images.length) { imgCount = 0; }
}

changeImage();
setInterval(changeImage, 2000);
    // var myIndex = 0;


// function carousel() {
//   console.log("calling")
//   var i;
//   var x = document.getElementsByClassName("mySlides");
//   console.log(x)
//   for (i = 0; i < x.length; i++) {
//     x[i].classList.add("not-visible");
//   }
//   myIndex++;
//   if (myIndex > x.length) {myIndex = 1}
//   x[myIndex-1].classList.add("visible");
//   setTimeout(carousel, 2000); // Change image every 2 seconds
// }
// carousel();
  }

}
