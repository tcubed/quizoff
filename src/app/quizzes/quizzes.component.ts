
import { Component, OnInit } from '@angular/core';
import { Quiz } from '../quiz';

import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quizoff',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css']
})
export class QuizzesComponent implements OnInit {
  quizzes: Quiz[];

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.getQuizzes();
  }

  getQuizzes(): void {
    this.quizService.getQuizzes()
        .subscribe(quizzes => this.quizzes = quizzes);
  }

  add(date: string, quizNumber: number, question: string, program: string, eventGroup: string, active: number, teams: []): void {
    /*
    "id": 1,
        "date": "4/1/2019",
        "quizNumber":1,
        "program": "WGL",
        "eventGroup": "A",
        "active": 1,
        "teams": [1,2,3,4,5,6,7,8,9,10,11]
    */
    // name = name.trim();
    const id = -1;
    if (!name) { return; }
    this.quizService.addQuiz({ id, date, quizNumber, question, program, eventGroup, active, teams } as Quiz)
      .subscribe(() => this.getQuizzes());
  }

  delete(quiz: Quiz): void {
    this.quizzes = this.quizzes.filter(h => h !== quiz);
    this.quizService.deleteQuiz(quiz).subscribe();
  }

}
