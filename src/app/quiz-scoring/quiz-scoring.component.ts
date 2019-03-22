
import { Component, OnInit } from '@angular/core';
import { Quizzer } from '../quizzer';
import { Location } from '@angular/common';

import { QuizzerService } from '../quizzer.service';

@Component({
  selector: 'app-quiz-scoring',
  templateUrl: './quiz-scoring.component.html',
  styleUrls: ['./quiz-scoring.component.css']
})
export class QuizScoringComponent implements OnInit {
  quizzer: Quizzer;
  quizzers: Quizzer[];

  constructor(
    private quizzerService: QuizzerService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getQuizzers();
  }

  /*
  onSelect(quizzer: Quizzer): void {
    this.selectedQuizzer = quizzer;
  }
  */
  getQuizzers(): void {
    this.quizzerService.getQuizzers()
        .subscribe(quizzers => this.quizzers = quizzers);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.quizzerService.updateQuizzer(this.quizzer)
      .subscribe(() => this.goBack());
  }
}
