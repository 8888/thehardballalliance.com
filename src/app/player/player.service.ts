import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';

@Injectable()
export class PlayerService {
    private playersUrl = '/api/players';

    constructor(private http: HttpClient) {}

    getPlayers() {
        return this.http.get(this.playersUrl);
    }

    createPlayer(player: object) {
        return this.http.post(this.playersUrl, player);
    }

    getPlayerByName(name: string) {
        const url = this.playersUrl + '/' + name;
        return this.http.get(url);
    }
}
