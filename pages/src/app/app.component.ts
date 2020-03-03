import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    images = [
        {
            title: "At the Beach",
            url: "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80"
        },
        {
            title: "At the Arcade",
            url: "https://images.unsplash.com/photo-1511882150382-421056c89033?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
        },
        {
            title: "At the Museum",
            url: "https://images.unsplash.com/photo-1513038630932-13873b1a7f29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80"
        },
        {
            title: "At the Library",
            url: "https://images.unsplash.com/photo-1546953304-5d96f43c2e94?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1101&q=80"
        },
        {
            title: "At the Stadium",
            url: "https://images.unsplash.com/photo-1515185474208-5b85338bd023?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"
        },
    ]
}
