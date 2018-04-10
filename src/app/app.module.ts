import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { httpInterceptorProviders } from './httpInterceptors/http-interceptors';

import { AppComponent } from './app.component';
import { GameResultsComponent } from './gameResults/game-results.component';
import { LeagueLeadersComponent } from './leagueLeaders/league-leaders.component';
import { NavBarComponent } from './navBar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { NewsComponent } from './newsFeed/news.component';
import { NewsFeedComponent } from './newsFeed/news-feed.component';
import { NewsPostComponent } from './newsFeed/news-post.component';
import { NewsFeedService } from './newsFeed/news-feed.service';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    GameResultsComponent,
    LeagueLeadersComponent,
    NavBarComponent,
    FooterComponent,
    NewsComponent,
    NewsFeedComponent,
    NewsPostComponent,
    AdminComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    httpInterceptorProviders,
    NewsFeedService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
