import { UserLevel } from '../types/badge';

// Level thresholds based on XP
const LEVEL_THRESHOLDS = [
  0,      // Level 1
  100,    // Level 2
  250,    // Level 3
  450,    // Level 4
  700,    // Level 5
  1000,   // Level 6
  1400,   // Level 7
  1850,   // Level 8
  2350,   // Level 9
  3000,   // Level 10
];

const MAX_LEVEL = 10;

/**
 * Calculate user level based on XP
 */
export function calculateLevel(xp: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) {
      return Math.min(i + 1, MAX_LEVEL);
    }
  }
  return 1;
}

/**
 * Get XP required for a specific level
 */
export function getXPForLevel(level: number): number {
  if (level <= 1) return 0;
  if (level > MAX_LEVEL) return LEVEL_THRESHOLDS[MAX_LEVEL - 1];
  return LEVEL_THRESHOLDS[level - 1];
}

/**
 * Get XP required for next level
 */
export function getXPForNextLevel(currentLevel: number): number {
  if (currentLevel >= MAX_LEVEL) return 0;
  return getXPForLevel(currentLevel + 1);
}

/**
 * Calculate XP progress for current level
 */
export function getXPProgress(currentXP: number, currentLevel: number): number {
  if (currentLevel >= MAX_LEVEL) return 100;
  
  const currentLevelXP = getXPForLevel(currentLevel);
  const nextLevelXP = getXPForLevel(currentLevel + 1);
  const xpInCurrentLevel = currentXP - currentLevelXP;
  const xpNeededForNext = nextLevelXP - currentLevelXP;
  
  return Math.min(100, Math.max(0, (xpInCurrentLevel / xpNeededForNext) * 100));
}

/**
 * Get complete level information
 */
export function getUserLevel(xp: number): UserLevel {
  const level = calculateLevel(xp);
  const xpForNextLevel = getXPForNextLevel(level);
  const progressPercentage = getXPProgress(xp, level);
  
  return {
    level,
    xp,
    xpForNextLevel,
    progressPercentage
  };
}

/**
 * Get level name/description
 */
export function getLevelName(level: number): string {
  const names: { [key: number]: string } = {
    1: 'Novice',
    2: 'Explorer',
    3: 'Learner',
    4: 'Practitioner',
    5: 'Expert',
    6: 'Master',
    7: 'Champion',
    8: 'Legend',
    9: 'Hero',
    10: 'NIRD Master'
  };
  
  return names[level] || `Level ${level}`;
}

