import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Quizzer } from '../quizzer';
import { QuizzerService } from '../quizzer.service';

@Component({
  selector: 'app-quizzer-search',
  templateUrl: './quizzer-search.component.html',
  styleUrls: [ './quizzer-search.component.css' ]
})
export class QuizzerSearchComponent implements OnInit {
  quizzers$: Observable<Quizzer[]>;
  private searchTerms = new Subject<string>();

  constructor(private quizzerService: QuizzerService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.quizzers$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.quizzerService.searchQuizzers(term)),
    );
  }
}