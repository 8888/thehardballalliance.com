import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NewsFeedService } from '../newsFeed/news-feed.service';
import { Post } from '../newsFeed/post';
import { LoginService } from '../login/login.service';

import { AppSettings } from '../appSettings';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
    public newPostForm: FormGroup;
    public message: string; // status message when submitting
    public messageIsError: boolean; // handles style class
    public posts: Post[];
    // the form can be used to create a new post
    // or to edit an existing post
    // this will be the DB PK ID of the post being editied
    // -1 if it is a new post
    public editingPostId: number;
    public editHeaders = {
        new: 'Create a new post',
        edit: 'You are editing an existing post!'
    };

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private nfs: NewsFeedService,
        private loginService: LoginService
    ) {
        this.editingPostId = -1; // init to new post
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

    private resetForm(): void {
        // reset form values to empty
        // reset date to now
        // set editing to -1 to mark as new post
        this.newPostForm.reset();
        this.resetFormDates();
        this.editingPostId = -1;
    }

    private handleHttpError(error: HttpErrorResponse) {
        // keys: status, statusText, url
        if (error.status === 401) {
            // unauthorized
            this.router.navigateByUrl('/' + AppSettings.CLIENT_ADMIN_LOGIN_URL);
        } else {
            this.setMessage(error.statusText, true);
        }
    }

    public onSubmit(): void {
        if (this.newPostForm.valid) {
            const post = new Post(this.formTitle, this.formBody, this.editingPostId, this.formPublishDate, this.formCreateDate);
            if (this.editingPostId === -1) {
                // create a new post
                this.nfs.submitNewPost(post).subscribe(
                    result => {
                        // created successfully
                        this.setMessage('Post created successfully!', false);
                        this.fetchPosts();
                    },
                    error => this.handleHttpError(error)
                );
            } else {
                // update an existing post
                this.nfs.submitModifyPost(post, this.editingPostId).subscribe(
                    result => {
                        // updated successfully
                        this.setMessage('Post updated successfully!', false);
                        this.fetchPosts();
                    },
                    error => this.handleHttpError(error)
                );
            }
            this.resetForm();
        }
    }

    public onClickSwitchToNew(): void {
        this.resetForm();
    }

    public onClickEditPost(post: Post): void {
        // set the post ID of the one being edited
        this.editingPostId = post.id;
        // patch value attempts to match all keys w/ form keys
        // if a key doesn't exist in the form it skips it
        this.newPostForm.patchValue(post, {emitEvent: false});
        // publishDate in Post is a ms timestamp
        // publishDate in the form is another form group
        // this is so it can parse the ms timestamp
        if (post.hasOwnProperty('publishDate')) {
            this.newPostForm.controls['publishDate'].patchValue(
                this.timestampToDate(post.publishDate),
                {emitEvent: false}
            );
        }
    }

    public onClickDeletePost(post: Post): void {
        this.nfs.deletePost(post.id).subscribe(
            result => {
                // deleted successfully
                this.setMessage('Post deleted successfully!', false);
                this.fetchPosts();
            },
            error => this.handleHttpError(error)
        );
        if (this.editingPostId === post.id) {
            // this post was in the editing box
            this.resetForm();
        }
    }
}
