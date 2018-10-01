import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../post.object';

@Component({
  selector: 'app-post-list-component',
  templateUrl: './post-list-component.component.html',
  styleUrls: ['./post-list-component.component.css']
})
export class PostListComponentComponent implements OnInit {

  @Input() posts: Post[];

  title = 'POST LIST';

  constructor() {
  }

  ngOnInit() {
  }

}
