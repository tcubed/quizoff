import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzerDetailComponent } from './quizzer-detail.component';

describe('QuizzerDetailComponent', () => {
  let component: QuizzerDetailComponent;
  let fixture: ComponentFixture<QuizzerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
