import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AppSettings } from '../appSettings';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
    buttons = [
        {display: 'Info', url: ''},
        {display: 'News', url: '/' + AppSettings.CLIENT_NEWS_URL},
        {display: 'Teams', url: ''},
        {display: 'Stats', url: ''},
        {display: 'Social Media', url: ''},
        {display: 'NABA', url: ''},
        {display: 'Contact', url: ''}
    ];

    constructor(private router: Router) {}

    public clickNavButton(url: string): void {
        // receives a router url
        this.router.navigateByUrl(url);
    }
}
