// Community-specific badges

import { Badge } from '../types/badge';

export const communityBadges: Badge[] = [
  {
    id: 'active-helper',
    name: 'Active Helper',
    icon: '👨‍🏫',
    description: 'Wrote 5 tutorials to help the community',
    category: 'bonus',
    condition: {
      type: 'challenges', // We'll track this separately
      value: 5,
      operator: '>='
    }
  },
  {
    id: 'idea-creator',
    name: 'Idea Creator',
    icon: '💡',
    description: 'Posted 10 ideas to improve the platform',
    category: 'bonus',
    condition: {
      type: 'challenges',
      value: 10,
      operator: '>='
    }
  },
  {
    id: 'community-star',
    name: 'Community Star',
    icon: '⭐',
    description: 'Received 50 upvotes on your posts',
    category: 'bonus',
    condition: {
      type: 'xp',
      value: 100, // We'll track upvotes separately
      operator: '>='
    }
  },
  {
    id: 'eco-advisor',
    name: 'Eco Advisor',
    icon: '🌱',
    description: 'Shared 10 sustainable tools with the community',
    category: 'bonus',
    condition: {
      type: 'challenges',
      value: 10,
      operator: '>='
    }
  }
];

