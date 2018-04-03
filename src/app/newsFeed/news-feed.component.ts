import { Component } from '@angular/core';

import { NewsFeedService } from './news-feed.service';
import { Post } from './post';

@Component({
    selector: 'app-news-feed',
    templateUrl: './news-feed.component.html',
    styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent {
    public posts: Post[]; // {title: string, body: string}

    constructor(
        private nfs: NewsFeedService
    ) {
        this.fetchPosts();
    }

    private fetchPosts(): void {
        // contact nfs for posts
        // receives an observable
        // received as {posts: [{post}, {post}, ...]}
        // the obects need to be formatted
        // then assigned to the posts array to be displayed
        this.nfs.fetchPosts().subscribe(result => {
            this.posts = this.formatPosts(result['posts']);
        });
    }

    private formatPosts(posts: object[]): Post[] {
        // takes an array of objects
        // converts them to Post objects
        // returns an array
        const result = [];
        for (let i = 0; i < posts.length; i++) {
            const post = posts[i];
            if (post.hasOwnProperty('title') && post.hasOwnProperty('body')) {
                // data is valid
                result.push(new Post(post['title'], post['body']));
            }
        }
        return result;
    }
}
