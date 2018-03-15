import { Component, Input } from '@angular/core';
import { PlayerService } from './player.service';

@Component({
    selector: 'app-player-details',
    templateUrl: './player-details.component.html',
    styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent {
    @Input()
    player: object;

    constructor(private playerService: PlayerService) {}
}
