export interface AttackOption {
  label: string;
  explanation: string;
  isGood: boolean;
}

export interface Attack {
  id: number;
  title: string;
  description: string;
  goodOption: Omit<AttackOption, 'isGood'>;
  badOption: Omit<AttackOption, 'isGood'>;
}

export interface GameState {
  score: number;
  hearts: number;
  currentAttackIndex: number;
  selectedChoices: boolean[];
  gameCompleted: boolean;
}

export interface ScoreResult {
  score: number;
  maxScore: number;
  percentage: number;
  evaluation: string;
  tips: string[];
}
