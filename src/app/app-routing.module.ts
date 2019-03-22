import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { QuizzersComponent } from './quizzers/quizzers.component';
import { QuizzerDetailComponent } from './quizzer-detail/quizzer-detail.component';
import { QuizScoringComponent } from './quiz-scoring/quiz-scoring.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: QuizzerDetailComponent },
  { path: 'quizzers', component: QuizzersComponent },
  { path: 'scoring', component: QuizScoringComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
