import { Component } from '@angular/core';
// to get route information
// https://stackoverflow.com/questions/42139277/how-to-ngif-on-router-link
import {Router} from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'QuizOff';
  constructor(public router: Router) {

  }
}
