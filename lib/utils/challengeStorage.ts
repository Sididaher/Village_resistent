// Utility functions for persisting challenge progress in localStorage

export interface ChallengeProgress {
  challengeId: number;
  checklist: { id: number; completed: boolean }[];
  notes: string;
  completed: boolean;
  completedAt?: string;
  reflectionAnswers?: { [key: number]: string };
}

export interface UserStats {
  completedChallenges: number[];
  totalXP: number;
  streak: number;
  lastActivityDate: string;
  earnedBadges: string[]; // Array of badge IDs
  level: number;
}

const STORAGE_KEY_PROGRESS = 'village-res-challenge-progress';
const STORAGE_KEY_STATS = 'village-res-user-stats';

export function getChallengeProgress(challengeId: number): ChallengeProgress | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY_PROGRESS);
    if (!stored) return null;
    
    const allProgress: ChallengeProgress[] = JSON.parse(stored);
    return allProgress.find(p => p.challengeId === challengeId) || null;
  } catch {
    return null;
  }
}

export function saveChallengeProgress(progress: ChallengeProgress): void {
  if (typeof window === 'undefined') return;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY_PROGRESS);
    const allProgress: ChallengeProgress[] = stored ? JSON.parse(stored) : [];
    
    const index = allProgress.findIndex(p => p.challengeId === progress.challengeId);
    if (index >= 0) {
      allProgress[index] = progress;
    } else {
      allProgress.push(progress);
    }
    
    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(allProgress));
  } catch (error) {
    console.error('Failed to save challenge progress:', error);
  }
}

export function getUserStats(): UserStats {
  if (typeof window === 'undefined') {
    return {
      completedChallenges: [],
      totalXP: 0,
      streak: 0,
      lastActivityDate: '',
      earnedBadges: [],
      level: 1
    };
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY_STATS);
    if (!stored) {
      return {
        completedChallenges: [],
        totalXP: 0,
        streak: 0,
        lastActivityDate: '',
        earnedBadges: [],
        level: 1
      };
    }
    const stats = JSON.parse(stored);
    // Ensure backward compatibility
    if (!stats.earnedBadges) stats.earnedBadges = [];
    if (!stats.level) stats.level = 1;
    return stats;
  } catch {
    return {
      completedChallenges: [],
      totalXP: 0,
      streak: 0,
      lastActivityDate: '',
      earnedBadges: [],
      level: 1
    };
  }
}

export function updateUserStats(xpReward: number, challengeId: number): { newBadges: string[]; levelUp: boolean } {
  if (typeof window === 'undefined') return { newBadges: [], levelUp: false };
  
  try {
    const stats = getUserStats();
    const today = new Date().toISOString().split('T')[0];
    const oldLevel = stats.level || 1;
    
    // Update streak
    if (stats.lastActivityDate === today) {
      // Already updated today, don't increment streak
    } else if (stats.lastActivityDate) {
      const lastDate = new Date(stats.lastActivityDate);
      const todayDate = new Date(today);
      const daysDiff = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === 1) {
        stats.streak += 1;
      } else {
        stats.streak = 1;
      }
    } else {
      stats.streak = 1;
    }
    
    stats.lastActivityDate = today;
    stats.totalXP += xpReward;
    
    if (!stats.completedChallenges.includes(challengeId)) {
      stats.completedChallenges.push(challengeId);
    }
    
    // Calculate new level (simple calculation to avoid circular dependency)
    const LEVEL_THRESHOLDS = [0, 100, 250, 450, 700, 1000, 1400, 1850, 2350, 3000];
    for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
      if (stats.totalXP >= LEVEL_THRESHOLDS[i]) {
        stats.level = Math.min(i + 1, 10);
        break;
      }
    }
    const levelUp = stats.level > oldLevel;
    
    localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(stats));
    
    // Check for new badges - we'll do this synchronously by importing at the top
    // For now, return empty array and let the component handle badge checking
    const newBadges: string[] = [];
    
    return { newBadges, levelUp };
  } catch (error) {
    console.error('Failed to update user stats:', error);
    return { newBadges: [], levelUp: false };
  }
}

export function isChallengeCompleted(challengeId: number): boolean {
  const progress = getChallengeProgress(challengeId);
  return progress?.completed || false;
}

