import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Quiz } from '../quiz';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: [ './scoreboard.component.css' ]
})
export class ScoreboardComponent implements OnInit {
  quiz: Quiz;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getQuiz();
    setInterval(() => this.getQuiz(), 3000);
  }

  getQuiz(): void {
    const id = 2; // +this.route.snapshot.paramMap.get('id');
    this.quizService.getQuiz(id)
        .subscribe(quiz => this.quiz = quiz);
  }

}
