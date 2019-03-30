import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Quizzer } from './quizzer';
// import { QUIZZERS } from './mock-quizzers';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({providedIn: 'root'})
export class QuizzerService {
  // private quizzersUrl = 'api/quizzers';  // URL to web api
  private quizzersUrl = 'http://localhost/quizoff/quizoff-app/api';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET quizzers from the server */
  getQuizzers(): Observable<Quizzer[]> {
    /*
    return this.http.get<Quizzer[]>(this.quizzersUrl)
      .pipe(
        tap(_ => this.log('fetched quizzers')),
        catchError(this.handleError('getQuizzers', []))
      );
    */

    return this.http.get<Quizzer[]>(`${this.quizzersUrl}/getQuizzers`)
    .pipe(
      tap(_ => this.log('fetched quizzers')),
      catchError(this.handleError<Quizzer[]>('getQuizzers', []))
    );
    /*
      .pipe(
        map((res) => {
          this.quizzers=res;
          return this.quizzersUrl;
        }),
        catchError(this.handleError('getQuizzers', []))
      );
      */
  }

  getQuizzersAssoc(): Observable<Quizzer[]> {
    return this.http.get<Quizzer[]>(`${this.quizzersUrl}/getQuizzersAssoc`)
    .pipe(
      tap(_ => this.log('fetched quizzers')),
      catchError(this.handleError<Quizzer[]>('getQuizzers', []))
    );
  }

  /** GET quizzer by id. Return `undefined` when id not found */
  getQuizzerNo404<Data>(id: number): Observable<Quizzer> {
    const url = `${this.quizzersUrl}/user/${id}`;
    return this.http.get<Quizzer[]>(url)
      .pipe(
        map(quizzers => quizzers[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} quizzer id=${id}`);
        }),
        catchError(this.handleError<Quizzer>(`getQuizzer id=${id}`))
      );
  }

  /** GET quizzer by id. Will 404 if id not found */
  getQuizzer(id: number): Observable<Quizzer> {
   // const url = `${this.quizzersUrl}/user/${id}/program/WGL/eventGroup/A`;
    const url = `${this.quizzersUrl}/user/${id}`;
    return this.http.get<Quizzer>(url).pipe(
      tap(_ => this.log(`fetched quizzer id=${id}`)),
      catchError(this.handleError<Quizzer>(`getQuizzer id=${id}`))
    );
  }

  /* GET quizzers whose name contains search term */
  searchQuizzers(term: string): Observable<Quizzer[]> {
    if (!term.trim()) {
      // if not search term, return empty quizzer array.
      return of([]);
    }
    return this.http.get<Quizzer[]>(`${this.quizzersUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found quizzers matching "${term}"`)),
      catchError(this.handleError<Quizzer[]>('searchQuizzers', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new quizzer to the server */
  addQuizzer(quizzer: Quizzer): Observable<Quizzer> {
    return this.http.post<Quizzer>(`${this.quizzersUrl}/user`, quizzer, httpOptions).pipe(
      tap((newQuizzer: Quizzer) => this.log(`added quizzer w/ id=${newQuizzer.id}`)),
      catchError(this.handleError<Quizzer>('addQuizzer'))
    );
  }

  /** DELETE: delete the quizzer from the server */
  deleteQuizzer(quizzer: Quizzer | number): Observable<Quizzer> {
    const id = typeof quizzer === 'number' ? quizzer : quizzer.id;
    const url = `${this.quizzersUrl}/deleteUser/${id}`;

    return this.http.delete<Quizzer>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted quizzer id=${id}`)),
      catchError(this.handleError<Quizzer>('deleteQuizzer'))
    );
  }

  /** PUT: update the quizzer on the server */
  updateQuizzer(quizzer: Quizzer): Observable<any> {
    // console.log(`${this.quizzersUrl}/updateUser`);
    // console.log(quizzer);
    // console.log(httpOptions);
    return this.http.put(`${this.quizzersUrl}/updateUser`, quizzer, httpOptions).pipe(
      tap(_ => this.log(`updated quizzer id=${quizzer.id}`)),
      catchError(this.handleError<any>('updateQuizzer'))
    );
  }

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

  /** Log a QuizzerService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`QuizzService: ${message}`);
  }

  /*
  getQuizzers(): Observable<Quizzer[]> {
    // TODO: send the message _after_ fetching the quizzers
    this.messageService.add('QuizzerService: fetched quizzers');
    return of(QUIZZERS);
  }

  getQuizzer(id: number): Observable<Quizzer> {
    // TODO: send the message _after_ fetching the quizzer
    this.messageService.add(`QuizzerService: fetched quizzer id=${id}`);
    return of(QUIZZERS.find(quizzer => quizzer.id === id));
  }
  */
}
