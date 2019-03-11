import { TestBed } from '@angular/core/testing';

import { QuizzerService } from './quizzer.service';

describe('QuizzerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuizzerService = TestBed.get(QuizzerService);
    expect(service).toBeTruthy();
  });
});
