'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import PostCard from '@/components/community/PostCard';
import { getIdeas, saveIdea, getUserName, getUserId } from '@/lib/utils/communityStorage';
import { awardXPForPosting } from '@/lib/utils/communityXP';
import { Idea } from '@/lib/types/community';
import { Lightbulb, Plus, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function IdeasPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    loadIdeas();
  }, []);

  const loadIdeas = () => {
    const allIdeas = getIdeas();
    // Sort by upvotes (most popular first)
    setIdeas(allIdeas.sort((a, b) => b.upvotes - a.upvotes));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newIdea: Idea = {
      id: `idea_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title,
      content,
      userId: getUserId(),
      userName: getUserName(),
      upvotes: 0,
      comments: [],
      savedBy: [],
      tags: tags.split(',').map(t => t.trim()).filter(t => t),
      createdAt: new Date().toISOString()
    };

    saveIdea(newIdea);
    awardXPForPosting('idea');
    loadIdeas();
    setTitle('');
    setContent('');
    setTags('');
    setShowForm(false);
  };

  const handleUpvote = (ideaId: string) => {
    const { upvoteIdea } = require('@/lib/utils/communityStorage');
    upvoteIdea(ideaId);
    loadIdeas();
  };

  return (
    <Layout>
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <Lightbulb className="w-10 h-10 text-blue-600" />
                Ideas Board
              </h1>
              <p className="text-gray-600">
                Share your ideas for sustainability, digital responsibility, and platform improvements
              </p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              New Idea
            </button>
          </div>

          {/* Post Form */}
          {showForm && (
            <div className="bg-white rounded-xl shadow-xl p-6 mb-8 border-2 border-blue-200">
              <h2 className="text-2xl font-bold mb-4">Share Your Idea</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder="e.g., Add a challenge for one week without social media"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    rows={5}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none"
                    placeholder="Explain your idea in detail..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder="sustainability, challenge, social-media"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
                  >
                    Post Idea (+10 XP)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setTitle('');
                      setContent('');
                      setTags('');
                    }}
                    className="px-6 py-3 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Sort Options */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-semibold text-gray-700">Sort by:</span>
            <button
              onClick={() => setIdeas([...ideas].sort((a, b) => b.upvotes - a.upvotes))}
              className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-semibold flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              Most Popular
            </button>
            <button
              onClick={() => setIdeas([...ideas].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))}
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-semibold"
            >
              Newest
            </button>
          </div>

          {/* Ideas List */}
          {ideas.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl shadow-lg">
              <Lightbulb className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-xl text-gray-600 mb-2">No ideas yet</p>
              <p className="text-gray-500 mb-6">Be the first to share an idea!</p>
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-xl hover:shadow-lg transition-all"
              >
                Share Your First Idea
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {ideas.map(idea => (
                <PostCard
                  key={idea.id}
                  type="idea"
                  post={idea}
                  onUpvote={() => handleUpvote(idea.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

