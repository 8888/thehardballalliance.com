export class Post {
    public title: string;
    public body: string;
    public id: number;
    public publishDate: number;
    public createDate: number;

    constructor(title, body, id = -1, publishDate = 0, createDate = 0) {
        this.title = title;
        this.body = body;
        this.id = id;
        // if ID is provided, it came from the DB
        // if an ID is not provided, such as creating a new form post,
        // it will be created by the DB
        // client will never create and provide an ID
        // it is the serial primary key in DB
        this.publishDate = publishDate;
        this.createDate = createDate;
    }
}
