// Community Hub storage utilities (localStorage-based, ready for Supabase migration)

import { Idea, Story, Tool, Tutorial, Comment } from '../types/community';

const STORAGE_KEY_IDEAS = 'village-res-community-ideas';
const STORAGE_KEY_STORIES = 'village-res-community-stories';
const STORAGE_KEY_TOOLS = 'village-res-community-tools';
const STORAGE_KEY_TUTORIALS = 'village-res-community-tutorials';
const STORAGE_KEY_USER_ID = 'village-res-user-id';

// Generate a simple user ID (in real app, this would come from auth)
export function getUserId(): string {
  if (typeof window === 'undefined') return 'anonymous';
  
  let userId = localStorage.getItem(STORAGE_KEY_USER_ID);
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(STORAGE_KEY_USER_ID, userId);
  }
  return userId;
}

export function getUserName(): string {
  // In a real app, this would come from user profile
  try {
    const { getUserStats } = require('./challengeStorage');
    const stats = getUserStats();
    return `User ${getUserId().substr(-6)}`;
  } catch {
    return `User ${getUserId().substr(-6)}`;
  }
}

// Ideas
export function getIdeas(): Idea[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY_IDEAS);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveIdea(idea: Idea): void {
  if (typeof window === 'undefined') return;
  const ideas = getIdeas();
  const index = ideas.findIndex(i => i.id === idea.id);
  if (index >= 0) {
    ideas[index] = idea;
  } else {
    ideas.push(idea);
  }
  localStorage.setItem(STORAGE_KEY_IDEAS, JSON.stringify(ideas));
}

export function deleteIdea(ideaId: string): void {
  if (typeof window === 'undefined') return;
  const ideas = getIdeas().filter(i => i.id !== ideaId);
  localStorage.setItem(STORAGE_KEY_IDEAS, JSON.stringify(ideas));
}

// Stories
export function getStories(): Story[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY_STORIES);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveStory(story: Story): void {
  if (typeof window === 'undefined') return;
  const stories = getStories();
  const index = stories.findIndex(s => s.id === story.id);
  if (index >= 0) {
    stories[index] = story;
  } else {
    stories.push(story);
  }
  localStorage.setItem(STORAGE_KEY_STORIES, JSON.stringify(stories));
}

export function deleteStory(storyId: string): void {
  if (typeof window === 'undefined') return;
  const stories = getStories().filter(s => s.id !== storyId);
  localStorage.setItem(STORAGE_KEY_STORIES, JSON.stringify(stories));
}

// Tools
export function getTools(): Tool[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY_TOOLS);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveTool(tool: Tool): void {
  if (typeof window === 'undefined') return;
  const tools = getTools();
  const index = tools.findIndex(t => t.id === tool.id);
  if (index >= 0) {
    tools[index] = tool;
  } else {
    tools.push(tool);
  }
  localStorage.setItem(STORAGE_KEY_TOOLS, JSON.stringify(tools));
}

export function deleteTool(toolId: string): void {
  if (typeof window === 'undefined') return;
  const tools = getTools().filter(t => t.id !== toolId);
  localStorage.setItem(STORAGE_KEY_TOOLS, JSON.stringify(tools));
}

// Tutorials
export function getTutorials(): Tutorial[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY_TUTORIALS);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveTutorial(tutorial: Tutorial): void {
  if (typeof window === 'undefined') return;
  const tutorials = getTutorials();
  const index = tutorials.findIndex(t => t.id === tutorial.id);
  if (index >= 0) {
    tutorials[index] = tutorial;
  } else {
    tutorials.push(tutorial);
  }
  localStorage.setItem(STORAGE_KEY_TUTORIALS, JSON.stringify(tutorials));
}

export function deleteTutorial(tutorialId: string): void {
  if (typeof window === 'undefined') return;
  const tutorials = getTutorials().filter(t => t.id !== tutorialId);
  localStorage.setItem(STORAGE_KEY_TUTORIALS, JSON.stringify(tutorials));
}

// Upvote functionality
export function upvoteIdea(ideaId: string): boolean {
  const ideas = getIdeas();
  const idea = ideas.find(i => i.id === ideaId);
  if (!idea) return false;
  
  const userId = getUserId();
  // Simple upvote (in real app, track who upvoted to prevent double voting)
  idea.upvotes += 1;
  saveIdea(idea);
  return true;
}

export function upvoteStory(storyId: string): boolean {
  const stories = getStories();
  const story = stories.find(s => s.id === storyId);
  if (!story) return false;
  
  story.upvotes += 1;
  saveStory(story);
  return true;
}

export function upvoteTutorial(tutorialId: string): boolean {
  const tutorials = getTutorials();
  const tutorial = tutorials.find(t => t.id === tutorialId);
  if (!tutorial) return false;
  
  tutorial.upvotes += 1;
  saveTutorial(tutorial);
  return true;
}

// Add comment
export function addCommentToIdea(ideaId: string, content: string): Comment {
  const ideas = getIdeas();
  const idea = ideas.find(i => i.id === ideaId);
  if (!idea) throw new Error('Idea not found');
  
  const comment: Comment = {
    id: `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    userId: getUserId(),
    userName: getUserName(),
    content,
    createdAt: new Date().toISOString(),
    upvotes: 0
  };
  
  idea.comments = idea.comments || [];
  idea.comments.push(comment);
  saveIdea(idea);
  
  return comment;
}

export function addCommentToStory(storyId: string, content: string): Comment {
  const stories = getStories();
  const story = stories.find(s => s.id === storyId);
  if (!story) throw new Error('Story not found');
  
  const comment: Comment = {
    id: `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    userId: getUserId(),
    userName: getUserName(),
    content,
    createdAt: new Date().toISOString(),
    upvotes: 0
  };
  
  story.comments = story.comments || [];
  story.comments.push(comment);
  saveStory(story);
  
  return comment;
}

export function addCommentToTool(toolId: string, content: string): Comment {
  const tools = getTools();
  const tool = tools.find(t => t.id === toolId);
  if (!tool) throw new Error('Tool not found');
  
  const comment: Comment = {
    id: `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    userId: getUserId(),
    userName: getUserName(),
    content,
    createdAt: new Date().toISOString(),
    upvotes: 0
  };
  
  tool.comments = tool.comments || [];
  tool.comments.push(comment);
  saveTool(tool);
  
  return comment;
}

export function addCommentToTutorial(tutorialId: string, content: string): Comment {
  const tutorials = getTutorials();
  const tutorial = tutorials.find(t => t.id === tutorialId);
  if (!tutorial) throw new Error('Tutorial not found');
  
  const comment: Comment = {
    id: `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    userId: getUserId(),
    userName: getUserName(),
    content,
    createdAt: new Date().toISOString(),
    upvotes: 0
  };
  
  tutorial.comments = tutorial.comments || [];
  tutorial.comments.push(comment);
  saveTutorial(tutorial);
  
  return comment;
}

// Rate a tool
export function rateTool(toolId: string, rating: number): void {
  const tools = getTools();
  const tool = tools.find(t => t.id === toolId);
  if (!tool) return;
  
  const userId = getUserId();
  tool.ratings = tool.ratings || [];
  const existingRating = tool.ratings.find(r => r.userId === userId);
  
  if (existingRating) {
    existingRating.rating = rating;
  } else {
    tool.ratings.push({ userId, rating });
  }
  
  // Calculate average rating
  const totalRating = tool.ratings.reduce((sum, r) => sum + r.rating, 0);
  tool.rating = totalRating / tool.ratings.length;
  
  saveTool(tool);
}

