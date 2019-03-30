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

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.quizService.updateQuiz(this.quiz)
      .subscribe(() => this.goBack());
  }
}
