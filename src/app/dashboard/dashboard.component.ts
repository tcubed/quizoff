import { Component, OnInit } from '@angular/core';
import { Quizzer } from '../quizzer';
import { QuizzerService } from '../quizzer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  quizzers: Quizzer[] = [];

  constructor(private quizzerService: QuizzerService) { }

  ngOnInit() {
    this.getQuizzers();
  }

  getQuizzers(): void {
    this.quizzerService.getQuizzers()
      .subscribe(quizzers => this.quizzers = quizzers.slice(1, 5));
  }
}
