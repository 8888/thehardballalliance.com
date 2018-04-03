import { Component, Input } from '@angular/core';

import { NewsFeedService } from './news-feed.service';

@Component({
    selector: 'app-news-post',
    templateUrl: './news-post.component.html',
    styleUrls: ['./news-post.component.css']
})
export class NewsPostComponent {
    @Input() title: string;
    @Input() body: string;

    constructor(private nfs: NewsFeedService) {}
}
