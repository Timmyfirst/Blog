export class Comment {
  constructor(
    public id: number,
    public author: string,
    public content: string,
    public createdAt: Date
  ) {}
}
