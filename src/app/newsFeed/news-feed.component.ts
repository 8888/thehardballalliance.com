import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-news-feed',
    templateUrl: './news-feed.component.html',
    styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent {
    public newPostForm: FormGroup;
    public posts: Object[]; // {title: string, body: string}

    constructor(private fb: FormBuilder) {
        this.createForm();
        this.posts = [];
    }

    private createForm(): void {
        this.newPostForm = this.fb.group({
            title: ['', Validators.required],
            body: ['', Validators.required]
        });
    }

    private get formTitle(): string {
        return this.newPostForm.controls['title'].value;
    }

    private get formBody(): string {
        return this.newPostForm.controls['body'].value;
    }

    public onSubmit(): void {
        if (this.newPostForm.valid) {
            this.posts.unshift({title: this.formTitle, body: this.formBody});
            this.newPostForm.reset();
        }
    }
}
