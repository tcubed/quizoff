import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzerSearchComponent } from './quizzer-search.component';

describe('QuizzerSearchComponent', () => {
  let component: QuizzerSearchComponent;
  let fixture: ComponentFixture<QuizzerSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzerSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
