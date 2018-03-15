import { Component, OnInit } from '@angular/core';
import { PlayerService } from './player.service';
import { PlayerDetailsComponent } from './player-details.component';

@Component({
    selector: 'app-player-list',
    templateUrl: './player-list.component.html',
    styleUrls: ['./player-list.component.css'],
    providers: [PlayerService]
})
export class PlayerListComponent implements OnInit {
    players: Object[];
    selectedPlayer: Object;

    constructor(private playerService: PlayerService) {}

    ngOnInit() {
        this.playerService.getPlayers()
            .subscribe(result => {
                this.players = result['players'];
            });
    }

    selectPlayer(player: object): void {
        this.selectedPlayer = player;
    }

    createNewPlayer(): void {
        const player = {
            name: '',
            number: ''
        };
        this.selectPlayer(player);
    }
}
