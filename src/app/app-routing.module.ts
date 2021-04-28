import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

import { QuizzersComponent } from './quizzers/quizzers.component';
import { QuizzerDetailComponent } from './quizzer-detail/quizzer-detail.component';

import { QuizzesComponent } from './quizzes/quizzes.component';
import { QuizDetailComponent } from './quiz-detail/quiz-detail.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';

import { TeamsComponent } from './teams/teams.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'home', component: HomeComponent },
  { path: 'scoreboard', component: ScoreboardComponent },
  { path: 'scoring', component: QuizDetailComponent },
  { path: 'quizzes', component: QuizzesComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'quizzers', component: QuizzersComponent },
  { path: 'detail/:id', component: QuizzerDetailComponent },
  { path: 'quiz/:id', component: QuizDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
