import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Quiz } from './quiz';
import { MessageService } from './message.service';

import { ApiConfig } from './apiconfig';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({providedIn: 'root'})
export class QuizService {
  // private quizsUrl = 'api/quizs';  // URL to web api
  // private quizzesUrl = 'http://localhost/quizoff/quizoff-app/api';
  private quizzesUrl = 'http://localhost/api';
  // private quizzesUrl = 'api';
  // private quizzesUrl = ApiConfig.url;

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {}

  /** GET quizs from the server */
  getQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.quizzesUrl}/getQuizzes`)
    .pipe(
      tap(_ => this.log('fetched quizzes')),
      catchError(this.handleError<Quiz[]>('getQuizzes', []))
    );
  }

  /** GET quiz by id. Return `undefined` when id not found */
  getQuizNo404<Data>(id: number): Observable<Quiz> {
    const url = `${this.quizzesUrl}/quiz/${id}`;
    return this.http.get<Quiz[]>(url)
      .pipe(
        map(quizzes => quizzes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} quiz id=${id}`);
        }),
        catchError(this.handleError<Quiz>(`getQuiz id=${id}`))
      );
  }

  /** GET quiz by id. Will 404 if id not found */
  getQuiz(id: number): Observable<Quiz> {
   // const url = `${this.quizsUrl}/user/${id}/program/WGL/eventGroup/A`;
    const url = `${this.quizzesUrl}/quiz/${id}`;
    return this.http.get<Quiz>(url).pipe(
      tap(_ => this.log(`fetched quiz id=${id}`)),
      catchError(this.handleError<Quiz>(`getQuiz id=${id}`))
    );
  }

  /* GET quizs whose name contains search term */
  searchQuizzes(term: string): Observable<Quiz[]> {
    if (!term.trim()) {
      // if not search term, return empty quiz array.
      return of([]);
    }
    return this.http.get<Quiz[]>(`${this.quizzesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found quizzes matching "${term}"`)),
      catchError(this.handleError<Quiz[]>('searchQuizzes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new quiz to the server */
  addQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(`${this.quizzesUrl}/quiz`, quiz, httpOptions).pipe(
      tap((newQuiz: Quiz) => this.log(`added quiz w/ id=${newQuiz.id}`)),
      catchError(this.handleError<Quiz>('addQuiz'))
    );
  }

  /** DELETE: delete the quiz from the server */
  deleteQuiz(quiz: Quiz | number): Observable<Quiz> {
    const id = typeof quiz === 'number' ? quiz : quiz.id;
    const url = `${this.quizzesUrl}/deleteQuiz/${id}`;

    return this.http.delete<Quiz>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted quiz id=${id}`)),
      catchError(this.handleError<Quiz>('deleteQuiz'))
    );
  }

  /** PUT: update the quiz on the server */
  updateQuiz(quiz: Quiz): Observable<any> {
    return this.http.put(`${this.quizzesUrl}/updateQuiz`, quiz, httpOptions).pipe(
      tap(_ => this.log(`updated quiz id=${quiz.id}`)),
      catchError(this.handleError<any>('updateQuiz'))
    );
  }

  /*
  updateScore(quiz: Quiz): Observable<any> {
    return this.http.put(`${this.quizzesUrl}/updateScore`, quiz, httpOptions).pipe(
      tap(_ => this.log(`updated quiz id=${quiz.id}`)),
      catchError(this.handleError<any>('updateScore'))
    );
  }
 */

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a QuizService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`QuizService: ${message}`);
  }
}
