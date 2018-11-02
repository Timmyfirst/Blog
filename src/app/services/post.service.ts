import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postsSubject = new Subject<Post[]>();

  date = new Date();

  private posts: Post[] = [
  ];

  constructor() {
    this.getPosts();
  }

  emitPostSubject() {
    this.postsSubject.next(this.posts.slice());
  }

  savePosts() {
    firebase.database().ref('/posts').set(this.posts);
  }

  getPosts() {
    firebase.database().ref('/posts')
      .on('value', (data: DataSnapshot) => {
          this.posts = data.val() ? data.val() : [];
          this.emitPostSubject();
        }
      );
  }

  getSinglePost(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/posts/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  addPost(title: string, content: string) {
    const postId: number = this.generateId();
    const comments: Comment[] = [];
    const postObject: Post = {
      id: postId,
      author: "Author",
      title: title,
      content: content,
      status: "activated",
      createdAt: this.date,
      comments: comments
    };
    this.posts.push(postObject);
    this.savePosts();
    this.emitPostSubject();
  }

  deletePost(id: number) {
    const postIndexToRemove = this.posts.findIndex(
      (postR) => {
        if(postR.id === id) {
          return true;
        }
      }
    );
    this.posts.splice(postIndexToRemove, 1);
    this.savePosts();
    this.emitPostSubject();
  }

  generateId() {
    if(this.posts.length !== 0) {
      return this.posts[(this.posts.length - 1)].id + 1;
    } else {
      return 0;
    }
  }

}
