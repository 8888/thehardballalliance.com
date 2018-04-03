import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NewsFeedService } from '../newsFeed/news-feed.service';
import { Post } from '../newsFeed/post';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html'
})
export class AdminComponent {
    public newPostForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private nfs: NewsFeedService
    ) {
        this.createForm();
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
            this.nfs.submitNewPost(post);
            this.newPostForm.reset();
        }
    }
}
