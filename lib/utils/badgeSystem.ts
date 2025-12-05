import { Badge, UserBadge } from '../types/badge';
import { badges, challengeCategories } from '../data/badges';
import { getUserStats } from './challengeStorage';
import { calculateLevel } from './levelSystem';

const STORAGE_KEY_BADGES = 'village-res-user-badges';

/**
 * Get all earned badges for the user
 */
export function getEarnedBadges(): string[] {
  const stats = getUserStats();
  return stats.earnedBadges || [];
}

/**
 * Check if user has earned a specific badge
 */
export function hasBadge(badgeId: string): boolean {
  return getEarnedBadges().includes(badgeId);
}

/**
 * Award a badge to the user
 */
export function awardBadge(badgeId: string): void {
  if (typeof window === 'undefined') return;
  
  const stats = getUserStats();
  if (!stats.earnedBadges.includes(badgeId)) {
    stats.earnedBadges.push(badgeId);
    
    // Save to stats
    const STORAGE_KEY_STATS = 'village-res-user-stats';
    localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(stats));
    
    // Also save to badges storage for history
    try {
      const stored = localStorage.getItem(STORAGE_KEY_BADGES);
      const badgeHistory: UserBadge[] = stored ? JSON.parse(stored) : [];
      badgeHistory.push({
        badgeId,
        earnedAt: new Date().toISOString()
      });
      localStorage.setItem(STORAGE_KEY_BADGES, JSON.stringify(badgeHistory));
    } catch (error) {
      console.error('Failed to save badge history:', error);
    }
  }
}

/**
 * Check all badge conditions and award badges
 */
export function checkAndAwardBadges(): string[] {
  const stats = getUserStats();
  const newlyEarned: string[] = [];
  
  // Calculate level if not set or needs update
  if (!stats.level || stats.level === 1 || stats.totalXP > 0) {
    stats.level = calculateLevel(stats.totalXP);
  }
  
  for (const badge of badges) {
    // Skip if already earned
    if (hasBadge(badge.id)) continue;
    
    // Check condition
    if (checkBadgeCondition(badge, stats)) {
      awardBadge(badge.id);
      newlyEarned.push(badge.id);
    }
  }
  
  return newlyEarned;
}

/**
 * Check if a badge condition is met
 */
function checkBadgeCondition(badge: Badge, stats: { completedChallenges: number[]; totalXP: number; streak: number; level: number }): boolean {
  const condition = badge.condition;
  
  switch (condition.type) {
    case 'xp':
      if (condition.operator === '>=') {
        return stats.totalXP >= (condition.value || 0);
      }
      return stats.totalXP === (condition.value || 0);
      
    case 'challenges':
      if (condition.operator === '>=') {
        return stats.completedChallenges.length >= (condition.value || 0);
      }
      return stats.completedChallenges.length === (condition.value || 0);
      
    case 'specific-challenges':
      if (condition.challengeIds && condition.operator === 'all') {
        return condition.challengeIds.every(id => stats.completedChallenges.includes(id));
      }
      return false;
      
    case 'level':
      if (condition.operator === '>=') {
        return stats.level >= (condition.value || 0);
      }
      return stats.level === (condition.value || 0);
      
    case 'streak':
      if (condition.operator === '>=') {
        return stats.streak >= (condition.value || 0);
      }
      return stats.streak === (condition.value || 0);
      
    case 'combination':
      // For NIRD Master: 15+ challenges AND level 10
      if (badge.id === 'nird-master') {
        return stats.completedChallenges.length >= 15 && stats.level >= 10;
      }
      return false;
      
    default:
      return false;
  }
}

/**
 * Get badge by ID
 */
export function getBadge(badgeId: string): Badge | undefined {
  return badges.find(b => b.id === badgeId);
}

/**
 * Get all badges (earned and locked)
 */
export function getAllBadges(): { badge: Badge; earned: boolean; earnedAt?: string }[] {
  const earnedBadges = getEarnedBadges();
  const badgeHistory = getBadgeHistory();
  
  return badges.map(badge => {
    const earned = earnedBadges.includes(badge.id);
    const history = badgeHistory.find(b => b.badgeId === badge.id);
    return {
      badge,
      earned,
      earnedAt: history?.earnedAt
    };
  });
}

/**
 * Get badge earning history
 */
export function getBadgeHistory(): UserBadge[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY_BADGES);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

