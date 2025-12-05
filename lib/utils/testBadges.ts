// Utility to test badge system - can be called from browser console
// Usage: import { testBadgeSystem } from '@/lib/utils/testBadges'; testBadgeSystem();

import { getUserStats } from './challengeStorage';
import { checkAndAwardBadges, getAllBadges, getEarnedBadges } from './badgeSystem';

export function testBadgeSystem() {
  console.log('=== Testing Badge System ===');
  
  const stats = getUserStats();
  console.log('Current Stats:', {
    totalXP: stats.totalXP,
    level: stats.level,
    completedChallenges: stats.completedChallenges,
    streak: stats.streak,
    earnedBadges: stats.earnedBadges
  });
  
  console.log('\nChecking for new badges...');
  const newBadges = checkAndAwardBadges();
  console.log('New badges earned:', newBadges);
  
  const allBadges = getAllBadges();
  console.log('\nAll Badges Status:');
  allBadges.forEach(({ badge, earned }) => {
    console.log(`${earned ? '✅' : '🔒'} ${badge.icon} ${badge.name} - ${badge.description}`);
  });
  
  console.log('\n=== Test Complete ===');
  return {
    stats,
    newBadges,
    allBadges
  };
}

