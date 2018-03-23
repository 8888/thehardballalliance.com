import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GameResultsComponent } from './gameResults/game-results.component';
import { LeagueLeadersComponent } from './leagueLeaders/league-leaders.component';
import { NavBarComponent } from './navBar/nav-bar.component';
import { NewsFeedComponent } from './newsFeed/news-feed.component';
import { PlayerListComponent } from './player/player-list.component';
import { PlayerDetailsComponent } from './player/player-details.component';


@NgModule({
  declarations: [
    AppComponent,
    GameResultsComponent,
    LeagueLeadersComponent,
    NavBarComponent,
    NewsFeedComponent,
    PlayerListComponent,
    PlayerDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
