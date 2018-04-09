import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AppSettings } from '../appSettings';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent {
    public year = new Date().getFullYear(); // used for copyright

    constructor(private router: Router) {}

    public clickNavButton(url: string): void {
        // receives a router url
        this.router.navigateByUrl(url);
    }
}
