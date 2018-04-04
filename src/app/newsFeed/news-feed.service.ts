import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { Post } from './post';

@Injectable()
export class NewsFeedService {
    private postsUrl = '/api/posts';

    constructor(private http: HttpClient) {}

    public fetchPosts(): Observable<object> {
        // call the server api for the post objects
        // receives {posts: [{post}, {post}, ...]}
        // receives this and returns it as an Observable
        return this.http.get(this.postsUrl);
    }

    public submitNewPost(post: Post): Observable<object> {
        // receives a Post object
        // send this data to the server to handle
        const url = this.postsUrl + '/create';
        return this.http.post(url, post);
    }
}
