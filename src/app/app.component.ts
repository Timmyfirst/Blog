import { Component } from '@angular/core';
import { Post } from './post.object';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  date = new Date();

  posts: Post[] = [
    {
      title: 'Post 1',
      content: 'Un message intéressant et méritant d\'être mis en avant',
      loveIts: 0,
      createdAt: this.date
    },
    {
      title: 'Post 2',
      content: 'Un post qui fait le buzz parce que c\'est choquant ou rigolo',
      loveIts: 0,
      createdAt: this.date
    },
    {
      title: 'Post 3',
      content: 'Un post parlant de l\'état actuel du climat de notre planète',
      loveIts: 0,
      createdAt: this.date
    }
  ];

  constructor() {
  }
}
