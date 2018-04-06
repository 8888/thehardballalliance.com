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
        this.newPostForm = this.fb.group({
            title: ['', Validators.required],
            body: ['', Validators.required]
        });
    }

    public get formTitle(): string {
        return this.newPostForm.controls['title'].value;
    }

    public get formBody(): string {
        return this.newPostForm.controls['body'].value;
    }

    public onSubmit(): void {
        if (this.newPostForm.valid) {
            const post = new Post(this.formTitle, this.formBody);
            this.nfs.submitNewPost(post).subscribe(result => {
                // http.post just creates an observable
                // you must subscribe to actually send the request
                // TODO: inform user if successful or not
                console.log(result);
            });
            this.newPostForm.reset();
        }
    }
}
