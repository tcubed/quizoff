
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuizzersComponent } from './quizzers/quizzers.component';
import { QuizzerDetailComponent } from './quizzer-detail/quizzer-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { QuizzerSearchComponent } from './quizzer-search/quizzer-search.component';
import { QuizScoringComponent } from './quiz-scoring/quiz-scoring.component';


@NgModule({
  declarations: [
    AppComponent,
    QuizzersComponent,
    QuizzerDetailComponent,
    QuizzerSearchComponent,
    MessagesComponent,
    DashboardComponent,
    QuizScoringComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
