import { Component } from '@angular/core';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
    buttons = ['Info', 'News', 'Teams', 'Stats', 'Social Media', 'NABA', 'Contact'];
}
