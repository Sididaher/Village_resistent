'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { getIdeas, getStories, getTools, getTutorials, addCommentToIdea, addCommentToStory, addCommentToTool, addCommentToTutorial, upvoteIdea, upvoteStory, upvoteTutorial, rateTool } from '@/lib/utils/communityStorage';
import { Idea, Story, Tool, Tutorial, Comment } from '@/lib/types/community';
import { ThumbsUp, MessageCircle, ArrowLeft, Star, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const type = params.type as 'idea' | 'story' | 'tool' | 'tutorial';
  const id = params.id as string;

  const [post, setPost] = useState<Idea | Story | Tool | Tutorial | null>(null);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    loadPost();
  }, [type, id]);

  const loadPost = () => {
    let found: Idea | Story | Tool | Tutorial | undefined;
    
    switch (type) {
      case 'idea':
        found = getIdeas().find(i => i.id === id);
        break;
      case 'story':
        found = getStories().find(s => s.id === id);
        break;
      case 'tool':
        found = getTools().find(t => t.id === id);
        break;
      case 'tutorial':
        found = getTutorials().find(t => t.id === id);
        if (found) {
          // Increment views
          found.views = (found.views || 0) + 1;
          const { saveTutorial } = require('@/lib/utils/communityStorage');
          saveTutorial(found);
        }
        break;
    }
    
    setPost(found || null);
  };

  const handleComment = () => {
    if (!comment.trim() || !post) return;

    try {
      switch (type) {
        case 'idea':
          addCommentToIdea(id, comment);
          break;
        case 'story':
          addCommentToStory(id, comment);
          break;
        case 'tool':
          addCommentToTool(id, comment);
          break;
        case 'tutorial':
          addCommentToTutorial(id, comment);
          break;
      }
      setComment('');
      loadPost();
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  const handleUpvote = () => {
    if (!post) return;
    
    switch (type) {
      case 'idea':
        upvoteIdea(id);
        break;
      case 'story':
        upvoteStory(id);
        break;
      case 'tutorial':
        upvoteTutorial(id);
        break;
    }
    loadPost();
  };

  const handleRate = (value: number) => {
    if (type === 'tool' && post) {
      rateTool(id, value);
      setRating(value);
      loadPost();
    }
  };

  if (!post) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto py-20 text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-6">This post doesn't exist or has been deleted.</p>
          <Link
            href="/community"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Back to Community
          </Link>
        </div>
      </Layout>
    );
  }

  const title = 'title' in post ? post.title : 'name' in post ? post.name : '';
  const content = 'content' in post ? post.content : 'body' in post ? post.body : post.description;
  const comments = 'comments' in post ? (post.comments || []) : [];

  return (
    <Layout>
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href={`/community/${type === 'idea' ? 'ideas' : type === 'story' ? 'stories' : type === 'tool' ? 'tools' : 'tutorials'}`}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to {type === 'idea' ? 'Ideas' : type === 'story' ? 'Stories' : type === 'tool' ? 'Tools' : 'Tutorials'}
          </Link>

          {/* Post Content */}
          <div className="bg-white rounded-xl shadow-xl p-8 mb-6 border-2 border-gray-200">
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span>{post.userName || 'Anonymous'}</span>
                <span>•</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                {type === 'tool' && 'rating' in post && (
                  <>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{post.rating.toFixed(1)}</span>
                    </div>
                  </>
                )}
                {type === 'tutorial' && 'views' in post && (
                  <>
                    <span>•</span>
                    <span>{post.views || 0} views</span>
                  </>
                )}
              </div>
            </div>

            <div className="prose max-w-none mb-6">
              {type === 'tutorial' ? (
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">{content}</div>
              ) : (
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{content}</p>
              )}
            </div>

            {/* Tool Rating */}
            {type === 'tool' && (
              <div className="mb-6 p-4 bg-purple-50 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2">Rate this tool:</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      onClick={() => handleRate(value)}
                      className={`w-10 h-10 rounded-lg transition-all ${
                        rating >= value || ('rating' in post && post.rating >= value)
                          ? 'bg-yellow-400 text-yellow-900'
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                    >
                      <Star className="w-5 h-5 mx-auto" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
              <button
                onClick={handleUpvote}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <ThumbsUp className="w-5 h-5" />
                <span className="font-semibold">{post.upvotes || 0}</span>
              </button>
              <div className="flex items-center gap-2 text-gray-600">
                <MessageCircle className="w-5 h-5" />
                <span>{comments.length} comments</span>
              </div>
              {type === 'tool' && 'websiteUrl' in post && (
                <a
                  href={post.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-purple-100 hover:bg-purple-200 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                  Visit Website
                </a>
              )}
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-white rounded-xl shadow-xl p-8 border-2 border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments</h2>
            
            <div className="mb-6">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
                rows={3}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none"
              />
              <button
                onClick={handleComment}
                className="mt-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
              >
                Post Comment
              </button>
            </div>

            <div className="space-y-4">
              {comments.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No comments yet. Be the first to comment!</p>
              ) : (
                comments.map((comment: Comment) => (
                  <div key={comment.id} className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-gray-900">{comment.userName || 'Anonymous'}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

