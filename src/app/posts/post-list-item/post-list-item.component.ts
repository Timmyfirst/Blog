import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.css']
})
export class PostListItemComponent implements OnInit {

  @Input() postId: number;
  @Input() postTitle: string;
  @Input() postContent: string;
  @Input() postCreatedAt: string;

  constructor(private postService: PostService) { }

  ngOnInit() {
  }

}
