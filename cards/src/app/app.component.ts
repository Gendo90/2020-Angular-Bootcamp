import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  posts = [
      {
          title: "Neat Tree",
          imageURL: "assets/tree.jpeg",
          username: "nature",
          content: "This cool tree I saw today"
      },
      {
          title: "Snowy Mountain",
          imageURL: "assets/mountain.jpeg",
          username: "mountainlover",
          content: "Here is a picture of a snowy mountain"
      },
      {
          title: "Mountain Biking",
          imageURL: "assets/biking.jpeg",
          username: "biking1222",
          content: "I did some biking today"
      },
      {
          title: "Mountain Biking",
          imageURL: "assets/biking.jpeg",
          username: "biking1222",
          content: "I did some biking today"
      }
  ];
}
