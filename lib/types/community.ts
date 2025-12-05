// Community Hub types

export interface Idea {
  id: string;
  title: string;
  content: string;
  userId: string;
  userName?: string;
  upvotes: number;
  comments: Comment[];
  savedBy: string[]; // User IDs who saved this
  tags: string[];
  createdAt: string;
  updatedAt?: string;
}

export interface Story {
  id: string;
  userId: string;
  userName?: string;
  title: string;
  content: string;
  challengeId?: number; // Related challenge if any
  upvotes: number;
  comments: Comment[];
  createdAt: string;
  updatedAt?: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  websiteUrl: string;
  category: 'productivity' | 'design' | 'development' | 'education' | 'other';
  tags: string[]; // 'open-source', 'eco', 'beginner-friendly', etc.
  rating: number; // Average rating 1-5
  ratings: { userId: string; rating: number }[];
  addedBy: string;
  addedByName?: string;
  comments: Comment[];
  createdAt: string;
}

export interface Tutorial {
  id: string;
  title: string;
  body: string; // Markdown or HTML content
  userId: string;
  userName?: string;
  category: 'linux' | 'open-source' | 'sustainability' | 'productivity' | 'other';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  upvotes: number;
  bookmarks: string[]; // User IDs who bookmarked
  comments: Comment[];
  views: number;
  createdAt: string;
  updatedAt?: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName?: string;
  content: string;
  createdAt: string;
  upvotes: number;
}

export interface CommunityPost {
  type: 'idea' | 'story' | 'tool' | 'tutorial';
  data: Idea | Story | Tool | Tutorial;
}

export interface WeeklyHighlights {
  bestIdea: Idea | null;
  mostUsefulTutorial: Tutorial | null;
  risingUser: { userId: string; userName: string; xpGained: number } | null;
  mostLikedTool: Tool | null;
}

