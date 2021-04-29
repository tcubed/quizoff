# QuizoffApp

This is an "quiz off" application meant for individual competition of Christian & Missionary Alliance (CMA) Bible Quizzing for the selection of the international team.  Although originally developed given the quiz-off rules used by the Western Great Lakes District (WGLD), it's possibly to use it in different configurations.

The primary (current) use is as a scoreboard, seen below, on a monitor or projection screen, together with a scorekeeping page.  This does *not* provide questions, or automatically score.  It is merely a convenient interface between the scorekeepers mobile device or laptop and the computer connected to the monitor or screen.

<img src="/src/assets/doc/scoreboard.png" alt="scoreboard"/>

Important features include:

 - Current quiz and question number are shown in the upper left.
 - Individual pictures, names, score
 - Quiz-out shown with a green background.
 - Errors shown on the card, and error-outs as a red background.

## WGLD Quiz-off Rules

The quiz-off consists of the following modifications:

 - The quiz consists of up to 10 quizzers and 20 "numbered" questions.
 - Each error is -10 points and the quizzer sits out the next question.  At 3 errors, the quizzer is out for the remainder of that quiz.
 - Quizzers continue to quiz in successive quizzes until they accumulate a total of 200 points.  The first 5 quizzers to make it to 200 points will be the Internationals team.  This may mean 6+ quizzes must take place until the 5 spots have been filled.

## Selecting the Quiz

Configured quizzes are shown on the quiz selection page.  Selecting one will bring the scorekeeper to the scoring page for that quiz.

<img src="/src/assets/doc/quizzes.png" alt="scoreboard"/>

## Scoring Page

The scoring page is shown below.  The quiz and question numbers can be changed +/- or reset back to 1.  Although A & B questions are supported, we don't currently use them given the rules above.  Individual quizzer score and errors are shown for each quizzer.  Checkboxes for quiz-out and error-out toggle the green and red background, respectively.

<img src="/src/assets/doc/score_enter.png" alt="scoreboard"/>

All scores are kept on the server.

## Details
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.5.  It began as a trial project to learn Angular.
