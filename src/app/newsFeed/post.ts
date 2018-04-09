export class Post {
    public title: string;
    public body: string;
    public publishDate: number;
    public createDate: number;

    constructor(title, body, publishDate = 0, createDate = 0) {
        this.title = title;
        this.body = body;
        this.publishDate = publishDate;
        this.createDate = createDate;
    }
}
