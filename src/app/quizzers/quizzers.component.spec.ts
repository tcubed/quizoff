import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzersComponent } from './quizzers.component';

describe('QuizzersComponent', () => {
  let component: QuizzersComponent;
  let fixture: ComponentFixture<QuizzersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
