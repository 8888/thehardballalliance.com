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
        // contact nfs for posts within a range of dates
        // receives an observable
        // received as {posts: [{post}, {post}, ...]}
        // the obects need to be formatted
        // then assigned to the posts array to be displayed
        const range = {
            start: Date.UTC(1988, 8, 8),
            end: Date.now()
        };
        this.nfs.fetchPosts(range).subscribe(result => {
            this.posts = this.nfs.formatPosts(result['posts']);
        });
    }
}
