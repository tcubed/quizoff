export class QuizzerScore {
  id: number;
  score: number;
  errors: number;
  reset: number;
  quizout: boolean;
  errorout: boolean;
}

export class Team {
  id: number;
  quizzers: QuizzerScore[];
}

export class Quiz {
    id: number;
    date: string;
    quizNumber: number;
    program: string;
    eventGroup: string;
    active: number;
    teams: Team[];
  }
