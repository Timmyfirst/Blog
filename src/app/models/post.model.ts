import { Comment } from './comment.model';

export class Post {
  constructor(
    public id: number,
    public author: string,
    public title: string,
    public content: string,
    public status: string,
    public createdAt: Date,
    public comments?: Comment[]
  ) {}
}
