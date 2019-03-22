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

  add(name: string, program: string, eventGroup: string): void {
    name = name.trim();
    if (!name) { return; }
    this.quizzerService.addQuizzer({ name, program, eventGroup } as Quizzer)
      // .subscribe(quizzer => {
      //   this.quizzers.push(quizzer);
      // });
      .subscribe(() => this.getQuizzers());
  }

  delete(quizzer: Quizzer): void {
    this.quizzers = this.quizzers.filter(h => h !== quizzer);
    this.quizzerService.deleteQuizzer(quizzer).subscribe();
  }

}
