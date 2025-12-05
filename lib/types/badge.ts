// Badge system types

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  condition: BadgeCondition;
  category?: 'beginner' | 'sustainability' | 'digital-responsibility' | 'linux' | 'master' | 'bonus';
}

export interface BadgeCondition {
  type: 'xp' | 'challenges' | 'specific-challenges' | 'level' | 'streak' | 'combination';
  value?: number;
  challengeIds?: number[];
  category?: string;
  operator?: '>=' | '==' | '<=' | 'all';
}

export interface UserBadge {
  badgeId: string;
  earnedAt: string;
}

export interface UserLevel {
  level: number;
  xp: number;
  xpForNextLevel: number;
  progressPercentage: number;
}

