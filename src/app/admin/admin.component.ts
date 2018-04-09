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
    }

    private createForm(): void {
        const ts = Date.now();
        this.newPostForm = this.fb.group({
            title: ['', Validators.required],
            body: ['', Validators.required],
            publishDate: [ts, Validators.required],
            createDate: [ts, Validators.required],
        });
    }

    public get formTitle(): string {
        return this.newPostForm.controls['title'].value;
    }

    public get formBody(): string {
        return this.newPostForm.controls['body'].value;
    }

    public get formPublishDate(): number {
        return this.newPostForm.controls['publishDate'].value;
    }

    public get formCreateDate(): number {
        return this.newPostForm.controls['createDate'].value;
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
        }
    }
}
