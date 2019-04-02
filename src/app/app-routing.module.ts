import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

import { QuizzersComponent } from './quizzers/quizzers.component';
import { QuizzerDetailComponent } from './quizzer-detail/quizzer-detail.component';

import { QuizzesComponent } from './quizzes/quizzes.component';
import { QuizDetailComponent } from './quiz-detail/quiz-detail.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';

import { TeamsComponent } from './teams/teams.component';

const routes: Routes = [
  { path: '', redirectTo: '/scoreboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'scoreboard', component: ScoreboardComponent },
  { path: 'detail/:id', component: QuizzerDetailComponent },
  { path: 'quizzers', component: QuizzersComponent },
  { path: 'scoring', component: QuizDetailComponent },
  { path: 'quizzes', component: QuizzesComponent },
  { path: 'quiz/:id', component: QuizDetailComponent },
  { path: 'teams', component: TeamsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
