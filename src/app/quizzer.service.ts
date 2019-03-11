import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Quizzer } from './quizzer';
import { QUIZZERS } from './mock-quizzers';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class QuizzerService {

  constructor(private messageService: MessageService) { }

  getQuizzers(): Observable<Quizzer[]> {
    // TODO: send the message _after_ fetching the quizzers
    this.messageService.add('QuizzerService: fetched quizzers');
    return of(QUIZZERS);
  }

  getQuizzer(id: number): Observable<Quizzer> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`QuizzerService: fetched quizzer id=${id}`);
    return of(QUIZZERS.find(quizzer => quizzer.id === id));
  }
}
