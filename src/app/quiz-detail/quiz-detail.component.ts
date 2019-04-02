import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Quiz } from '../quiz';
import { Quizzer } from '../quizzer';
import { QuizService } from '../quiz.service';
import { QuizzerService } from '../quizzer.service';

@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.css']
})
export class QuizDetailComponent implements OnInit {
  quiz: Quiz;
  quizzers: Quizzer[];
  // private quizout: false;
  // private errorout: false;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private quizzerService: QuizzerService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getQuiz();
    this.getQuizzers();
  }

  getQuiz(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.quizService.getQuiz(id)
        .subscribe(quiz => this.quiz = quiz);
  }
  getQuizzers(): void {
    this.quizzerService.getQuizzers()
        .subscribe(quizzers => this.quizzers = quizzers);
  }

  updateScore(quizId, idxTeam, idxQuizzer, score, errors, reset): void {
    if (reset > 0) {
      this.quiz.teams[idxTeam].quizzers[idxQuizzer].score = 20;
      this.quiz.teams[idxTeam].quizzers[idxQuizzer].errors = 0;
    } else {
      this.quiz.teams[idxTeam].quizzers[idxQuizzer].score += score;
      this.quiz.teams[idxTeam].quizzers[idxQuizzer].errors += errors;
    }
    // this.quiz.teams[idxTeam].quizzers[idxQuizzer].errorout = this.errorout;

    this.quizService.updateQuiz(this.quiz)
      .subscribe();
  }
  updateQuizout(checked, quizId, idxTeam, idxQuizzer): void {
    this.quiz.teams[idxTeam].quizzers[idxQuizzer].quizout = checked;
    // console.log(checked);
    this.quizService.updateQuiz(this.quiz)
      .subscribe();
  }
  updateErrorout(checked, quizId, idxTeam, idxQuizzer): void {
    this.quiz.teams[idxTeam].quizzers[idxQuizzer].errorout = checked;
    // console.log(checked);
    this.quizService.updateQuiz(this.quiz)
      .subscribe();
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.quizService.updateQuiz(this.quiz)
      .subscribe(() => this.goBack());
  }
}
