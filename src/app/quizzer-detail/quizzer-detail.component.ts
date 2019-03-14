import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Quizzer } from '../quizzer';
import { QuizzerService } from '../quizzer.service';

@Component({
  selector: 'app-quizzer-detail',
  templateUrl: './quizzer-detail.component.html',
  styleUrls: ['./quizzer-detail.component.css']
})
export class QuizzerDetailComponent implements OnInit {
  quizzer: Quizzer;

  constructor(
    private route: ActivatedRoute,
    private quizzerService: QuizzerService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getQuizzer();
  }

  getQuizzer(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.quizzerService.getQuizzer(id)
      .subscribe(quizzer => this.quizzer = quizzer);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.quizzerService.updateQuizzer(this.quizzer)
      .subscribe(() => this.goBack());
  }
}
