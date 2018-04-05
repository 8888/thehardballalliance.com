import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { GameResultsComponent } from './gameResults/game-results.component';
import { LeagueLeadersComponent } from './leagueLeaders/league-leaders.component';
import { NavBarComponent } from './navBar/nav-bar.component';
import { NewsComponent } from './newsFeed/news.component';
import { NewsFeedComponent } from './newsFeed/news-feed.component';
import { NewsPostComponent } from './newsFeed/news-post.component';
import { NewsFeedService } from './newsFeed/news-feed.service';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { AdminComponent } from './admin/admin.component';
import { PlayerListComponent } from './player/player-list.component';
import { PlayerDetailsComponent } from './player/player-details.component';


@NgModule({
  declarations: [
    AppComponent,
    GameResultsComponent,
    LeagueLeadersComponent,
    NavBarComponent,
    NewsComponent,
    NewsFeedComponent,
    NewsPostComponent,
    AdminComponent,
    LoginComponent,
    PlayerListComponent,
    PlayerDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    NewsFeedService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
