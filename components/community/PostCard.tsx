'use client';

import { Idea, Story, Tool, Tutorial } from '@/lib/types/community';
import { ThumbsUp, MessageCircle, Bookmark, ExternalLink, Star } from 'lucide-react';
import Link from 'next/link';
// Simple time ago function (date-fns can be added later if needed)
function timeAgo(date: string): string {
  const now = new Date();
  const then = new Date(date);
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);
  
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
  return `${Math.floor(seconds / 604800)} weeks ago`;
}

interface PostCardProps {
  type: 'idea' | 'story' | 'tool' | 'tutorial';
  post: Idea | Story | Tool | Tutorial;
  onUpvote?: () => void;
  onSave?: () => void;
}

export default function PostCard({ type, post, onUpvote, onSave }: PostCardProps) {
  const getTypeColor = () => {
    switch (type) {
      case 'idea': return 'from-blue-500 to-indigo-500';
      case 'story': return 'from-green-500 to-emerald-500';
      case 'tool': return 'from-purple-500 to-pink-500';
      case 'tutorial': return 'from-orange-500 to-amber-500';
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'idea': return '💡';
      case 'story': return '📖';
      case 'tool': return '🛠️';
      case 'tutorial': return '📚';
    }
  };

  const timeAgoText = timeAgo(post.createdAt);

  return (
    <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 hover:shadow-xl transition-all p-6">
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-12 h-12 bg-gradient-to-r ${getTypeColor()} rounded-full flex items-center justify-center text-2xl flex-shrink-0`}>
          {getTypeIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
            {'title' in post ? post.title : 'name' in post ? post.name : ''}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
            {post.description || ('content' in post ? post.content.substring(0, 150) + '...' : '')}
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>{post.userName || 'Anonymous'}</span>
            <span>•</span>
            <span>{timeAgoText}</span>
            {type === 'tool' && 'rating' in post && (
              <>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>{post.rating.toFixed(1)}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center gap-4">
          <button
            onClick={onUpvote}
            className="flex items-center gap-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ThumbsUp className="w-4 h-4" />
            <span className="font-semibold">{post.upvotes || 0}</span>
          </button>
          <div className="flex items-center gap-2 text-gray-600">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm">{('comments' in post ? post.comments?.length : 0) || 0}</span>
          </div>
          {type === 'tutorial' && 'views' in post && (
            <div className="text-sm text-gray-600">
              {post.views || 0} views
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {onSave && (
            <button
              onClick={onSave}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Save"
            >
              <Bookmark className="w-4 h-4" />
            </button>
          )}
          {type === 'tool' && 'websiteUrl' in post && (
            <a
              href={post.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Visit website"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          <Link
            href={`/community/${type}/${post.id}`}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:shadow-lg transition-all text-sm font-semibold"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}

