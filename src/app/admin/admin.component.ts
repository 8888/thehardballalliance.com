import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NewsFeedService } from '../newsFeed/news-feed.service';
import { Post } from '../newsFeed/post';
import { LoginService } from '../login/login.service';

import { AppSettings } from '../appSettings';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
    public newPostForm: FormGroup;
    public message: string;
    public messageIsError: boolean; // handles style class
    public posts: Post[];

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private nfs: NewsFeedService,
        private loginService: LoginService
    ) {
        this.createForm();
    }

    ngOnInit() {
        if (!this.loginService.userIsLoggedIn()) {
            // user is not logged in
            // redirect to the login page
            this.router.navigateByUrl('/' + AppSettings.CLIENT_ADMIN_LOGIN_URL);
        }
        this.fetchPosts();
    }

    private timestampToDate(timestamp: number): object {
        // timestamp is ms since epoch
        // creates an object with specific keys
        // based upon the date from the timestamp
        // can be passed into a formBuilder group to create a form
        const date = new Date(timestamp);
        const dateForm = {
            year: date.getUTCFullYear(),
            month: date.getUTCMonth() + 1, // month is 0-11
            day: date.getUTCDate(),
            hour: date.getUTCHours(),
            minutes: date.getUTCMinutes(),
            seconds: date.getUTCSeconds(),
            ms: date.getUTCMilliseconds()
        };
        return dateForm;
    }

    private dateToTimestamp(date: object): number {
        // takes an object as created by the method timestampToDate
        // this is NOT the standard JS Date object, but it is also being used
        // returns the ms since epoch, as JS Date object expects
        const ts = Date.UTC(
            date['year'],
            date['month'] - 1, // month is 0-11
            date['day'],
            date['hour'],
            date['minutes'],
            date['seconds'],
            date['ms']
        );
        return ts;
    }

    private resetFormDates(): void {
        // sets the create date and publish date in the form
        // used to reset to current value
        const ts = Date.now();
        this.newPostForm.patchValue({createDate: ts, publishDate: this.timestampToDate(ts)}, {emitEvent: false});
    }

    private createForm(): void {
        const ts = Date.now();
        this.newPostForm = this.fb.group({
            title: ['', Validators.required],
            body: ['', Validators.required],
            createDate: [ts, Validators.required],
            publishDate: this.fb.group(this.timestampToDate(ts))
        });
    }

    public get formTitle(): string {
        return this.newPostForm.controls['title'].value;
    }

    public get formBody(): string {
        return this.newPostForm.controls['body'].value;
    }

    public get formPublishDate(): number {
        const date = this.newPostForm.controls['publishDate'].value;
        return this.dateToTimestamp(date);
    }

    public get formCreateDate(): number {
        return this.newPostForm.controls['createDate'].value;
    }

    private fetchPosts(): void {
        // contact nfs for all posts
        // receives an observable
        // received as {posts: [{post}, {post}, ...]}
        // the obects need to be formatted
        // then assigned to the posts array to be displayed
        this.nfs.fetchPosts().subscribe(result => {
            this.posts = this.nfs.formatPosts(result['posts']);
        });
    }

    private async setMessage(message: string, error: boolean, length = 5000): Promise<any> {
        // sets the message to be displayed
        // error: true=red false=green
        // length is time to display message for in ms, default is 5 seconds
        this.message = message;
        this.messageIsError = error;
        (async () => {
            await (() => {
                return new Promise(resolve => setTimeout(resolve, length));
            })();
            this.message = '';
        })();
    }

    public onSubmit(): void {
        if (this.newPostForm.valid) {
            const post = new Post(this.formTitle, this.formBody, this.formPublishDate, this.formCreateDate);
            this.nfs.submitNewPost(post).subscribe(
                result => {
                    // created successfully
                    this.setMessage('Post created successfully!', false);
                },
                error => {
                    // error is an HttpErrorResponse object
                    // keys: status, statusText, url
                    if (error.status === 401) {
                        // unauthorized
                        this.router.navigateByUrl('/' + AppSettings.CLIENT_ADMIN_LOGIN_URL);
                    } else {
                        this.setMessage(error.statusText, true);
                    }
                }
            );
            this.newPostForm.reset();
            this.resetFormDates();
        }
    }
}
