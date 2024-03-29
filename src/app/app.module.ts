
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessagesComponent } from './messages/messages.component';

// quizzer
import { QuizzersComponent } from './quizzers/quizzers.component';
import { QuizzerDetailComponent } from './quizzer-detail/quizzer-detail.component';
import { QuizzerSearchComponent } from './quizzer-search/quizzer-search.component';

// quiz
import { QuizDetailComponent } from './quiz-detail/quiz-detail.component';
import { QuizzesComponent } from './quizzes/quizzes.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';

// team
import { TeamsComponent } from './teams/teams.component';
import { HomeComponent } from './home/home.component';
// import { ApiConfig } from './apiconfig';


@NgModule({
  declarations: [
    AppComponent,
    QuizzersComponent,
    QuizzerDetailComponent,
    QuizzerSearchComponent,
    MessagesComponent,
    DashboardComponent,
    QuizDetailComponent,
    QuizzesComponent,
    TeamsComponent,
    ScoreboardComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
