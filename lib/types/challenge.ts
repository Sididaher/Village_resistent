// Challenge types for post-game learning activities

export interface Challenge {
  id: number;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'usage' | 'practice' | 'teaching' | 'community';
  xpReward: number;
  icon: string;
  steps: string[];
  resources: Resource[];
  checklist: ChecklistItem[];
  reflectionQuestions: string[];
}

export interface Resource {
  title: string;
  url: string;
  description: string;
}

export interface ChecklistItem {
  id: number;
  text: string;
  completed: boolean;
}

export interface MiniScenario {
  id: number;
  title: string;
  description: string;
  situation: string;
  choices: ScenarioChoice[];
  correctChoiceIndex: number;
  explanation: string;
  category: 'sustainability' | 'vendor-management' | 'decision-making' | 'cost-analysis';
  xpReward: number;
}

export interface ScenarioChoice {
  id: number;
  text: string;
  feedback: string;
  isOptimal: boolean;
  consequence?: string;
}

export interface UserProgress {
  completedChallenges: number[];
  completedScenarios: number[];
  totalXP: number;
  streak: number; // consecutive days of completing challenges
  lastActivityDate: string;
}
