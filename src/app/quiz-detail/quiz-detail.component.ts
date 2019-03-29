
import { Component, OnInit } from '@angular/core';
import { Quiz } from '../quiz';
import { Location } from '@angular/common';

import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.css']
})
export class QuizDetailComponent implements OnInit {
  quiz: Quiz;
  quizzes: Quiz[];

  constructor(
    private quizService: QuizService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getQuizzes();
  }

  /*
  onSelect(quiz: Quiz): void {
    this.selectedQuiz = quiz;
  }
  */
  getQuizzes(): void {
    this.quizService.getQuizzes()
        .subscribe(quizzes => this.quizzes = quizzes);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.quizService.updateQuiz(this.quiz)
      .subscribe(() => this.goBack());
  }
}
