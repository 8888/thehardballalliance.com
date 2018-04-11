import { Component, Input, OnChanges } from '@angular/core';

import { NewsFeedService } from './news-feed.service';

@Component({
    selector: 'app-news-post',
    templateUrl: './news-post.component.html',
    styleUrls: ['./news-post.component.css']
})
export class NewsPostComponent implements OnChanges {
    @Input() title: string;
    @Input() body: string;
    @Input() timestamp: number;
    timestampString: string;
    @Input() id: number; // DB primary key ID
    // a post can be viewed in its full entirety
    // if displayFull=true (default) all info will be shown
    // used for news feed etc
    // if displayFull=false then limited information is shown
    // used for a compact view, in admin when choosing a post to edit
    @Input() displayFull = true;

    constructor(private nfs: NewsFeedService) {}

    ngOnChanges() {
        if (this.timestamp) {
            this.timestampString = new Date(this.timestamp).toLocaleString([], {
                year: '2-digit',
                month: 'numeric',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    }
}
