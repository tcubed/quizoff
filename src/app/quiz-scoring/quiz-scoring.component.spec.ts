import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizScoringComponent } from './quiz-scoring.component';

describe('QuizScoringComponent', () => {
  let component: QuizScoringComponent;
  let fixture: ComponentFixture<QuizScoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizScoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizScoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
