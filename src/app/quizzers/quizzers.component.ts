import { Component, OnInit } from '@angular/core';
import { Quizzer } from '../quizzer';

import { QuizzerService } from '../quizzer.service';
// import { QUIZZERS } from '../mock-quizzers';

@Component({
  selector: 'app-quizoff',
  templateUrl: './quizzers.component.html',
  styleUrls: ['./quizzers.component.css']
})
export class QuizzersComponent implements OnInit {
  /*
  hero: Quizzer = {
    id: 1,
    name: 'Hope T'
  };
  */
  // quizzers = QUIZZERS;
  // selectedQuizzer: Quizzer;
  quizzers: Quizzer[];

  constructor(private quizzerService: QuizzerService) { }

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

}
