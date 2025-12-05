// XP rewards for community participation

import { updateUserStats } from './challengeStorage';

const XP_REWARDS = {
  POST_IDEA: 10,
  POST_STORY: 15,
  POST_TOOL: 20,
  POST_TUTORIAL: 30,
  RECEIVE_UPVOTE: 2,
  RECEIVE_COMMENT: 1,
  GET_50_UPVOTES: 50, // Bonus for popular content
};

export function awardXPForPosting(type: 'idea' | 'story' | 'tool' | 'tutorial'): number {
  const xpAmount = 
    type === 'idea' ? XP_REWARDS.POST_IDEA :
    type === 'story' ? XP_REWARDS.POST_STORY :
    type === 'tool' ? XP_REWARDS.POST_TOOL :
    XP_REWARDS.POST_TUTORIAL;
  
  // Use a dummy challenge ID for community XP (won't affect challenge completion)
  updateUserStats(xpAmount, 999);
  return xpAmount;
}

export function awardXPForUpvote(): number {
  updateUserStats(XP_REWARDS.RECEIVE_UPVOTE, 999);
  return XP_REWARDS.RECEIVE_UPVOTE;
}

export function awardXPForComment(): number {
  updateUserStats(XP_REWARDS.RECEIVE_COMMENT, 999);
  return XP_REWARDS.RECEIVE_COMMENT;
}

export function awardXPForPopularContent(): number {
  updateUserStats(XP_REWARDS.GET_50_UPVOTES, 999);
  return XP_REWARDS.GET_50_UPVOTES;
}

