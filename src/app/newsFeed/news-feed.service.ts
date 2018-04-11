import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { Post } from './post';

@Injectable()
export class NewsFeedService {
    private postsUrl = '/api/posts';

    constructor(private http: HttpClient) {}

    public fetchPosts(range = null): Observable<object> {
        // call the server api for the post objects
        // range is an optional argument of a range object
        // {start: timestamp, end: timestamp}
        // if range is supplied only get posts within this range
        // receives {posts: [{post}, {post}, ...]}
        // receives this and returns it as an Observable
        let url = this.postsUrl;
        if (range) {
            url += '?start=' + range['start'] + '&end=' + range['end'];
        }
        return this.http.get(url);
    }

    public submitNewPost(post: Post): Observable<object> {
        // receives a Post object
        // send this data to the server to handle
        const url = this.postsUrl + '/create';
        return this.http.post(url, post);
    }
}
