import { Badge } from '../types/badge';

export const badges: Badge[] = [
  {
    id: 'beginner-explorer',
    name: 'Beginner Explorer',
    icon: '🟦',
    description: 'Completed your first challenge! Welcome to the NIRD community.',
    category: 'beginner',
    condition: {
      type: 'challenges',
      value: 1,
      operator: '>='
    }
  },
  {
    id: 'eco-friendly-warrior',
    name: 'Eco-Friendly Warrior',
    icon: '🍃',
    description: 'Completed 3 sustainability challenges. You\'re helping the planet!',
    category: 'sustainability',
    condition: {
      type: 'specific-challenges',
      challengeIds: [1, 5, 8], // Reduce Internet Usage, Revive Old Computer, Zero Commercial Software Day
      operator: 'all'
    }
  },
  {
    id: 'digital-responsibility-champion',
    name: 'Digital Responsibility Champion',
    icon: '🌐',
    description: 'Mastered digital ethics and open-source principles.',
    category: 'digital-responsibility',
    condition: {
      type: 'xp',
      value: 300,
      operator: '>='
    }
  },
  {
    id: 'linux-hero',
    name: 'Linux Hero',
    icon: '🐧',
    description: 'Completed all Linux-related challenges. You\'re a true NIRD ambassador!',
    category: 'linux',
    condition: {
      type: 'specific-challenges',
      challengeIds: [2, 3, 5], // Full Day with Linux, Try LibreOffice Week, Revive Old Computer
      operator: 'all'
    }
  },
  {
    id: 'nird-master',
    name: 'NIRD Master',
    icon: '🏆',
    description: 'The ultimate achievement! Completed 15+ challenges and reached Level 10.',
    category: 'master',
    condition: {
      type: 'combination',
      value: 15, // challenges
      operator: '>='
    }
  },
  // Bonus badges
  {
    id: 'streak-master',
    name: 'Streak Master',
    icon: '🔥',
    description: 'Maintained a 7-day streak of completing challenges!',
    category: 'bonus',
    condition: {
      type: 'streak',
      value: 7,
      operator: '>='
    }
  },
  {
    id: 'contributor',
    name: 'Contributor',
    icon: '💡',
    description: 'Shared knowledge or resources with the community.',
    category: 'bonus',
    condition: {
      type: 'challenges',
      value: 5,
      operator: '>='
    }
  }
];

// Challenge categories mapping for badge checking
export const challengeCategories: { [key: number]: string[] } = {
  1: ['sustainability', 'usage'], // Reduce Internet Usage
  2: ['linux', 'practice'], // Full Day with Linux
  3: ['linux', 'practice'], // Try LibreOffice Week
  4: ['teaching'], // Teach NIRD in Class
  5: ['sustainability', 'linux', 'practice'], // Revive Old Computer
  6: ['community'], // Open-Source Alternatives Research
  7: ['practice'], // Self-Host a Service
  8: ['sustainability', 'usage'], // Zero Commercial Software Day
  9: ['community'], // Calculate School's Software Costs
  10: ['community'] // Join Open-Source Community
};

