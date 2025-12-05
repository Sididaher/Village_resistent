'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import PostCard from '@/components/community/PostCard';
import { getStories, saveStory, getUserName, getUserId } from '@/lib/utils/communityStorage';
import { awardXPForPosting } from '@/lib/utils/communityXP';
import { Story } from '@/lib/types/community';
import { BookOpen, Plus } from 'lucide-react';

export default function StoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = () => {
    const allStories = getStories();
    setStories(allStories.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newStory: Story = {
      id: `story_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title,
      content,
      userId: getUserId(),
      userName: getUserName(),
      upvotes: 0,
      comments: [],
      createdAt: new Date().toISOString()
    };

    saveStory(newStory);
    awardXPForPosting('story');
    loadStories();
    setTitle('');
    setContent('');
    setShowForm(false);
  };

  const handleUpvote = (storyId: string) => {
    const { upvoteStory } = require('@/lib/utils/communityStorage');
    upvoteStory(storyId);
    loadStories();
  };

  return (
    <Layout>
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <BookOpen className="w-10 h-10 text-green-600" />
                Experiences & Stories
              </h1>
              <p className="text-gray-600">
                Share your journey with NIRD principles and inspire others
              </p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Share Story
            </button>
          </div>

          {showForm && (
            <div className="bg-white rounded-xl shadow-xl p-6 mb-8 border-2 border-green-200">
              <h2 className="text-2xl font-bold mb-4">Share Your Experience</h2>
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
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200"
                    placeholder="e.g., I tried LibreOffice for one week"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Story
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    rows={8}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 resize-none"
                    placeholder="Tell us about your experience, what you learned, challenges you faced..."
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
                  >
                    Share Story (+15 XP)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setTitle('');
                      setContent('');
                    }}
                    className="px-6 py-3 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {stories.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl shadow-lg">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-xl text-gray-600 mb-2">No stories yet</p>
              <p className="text-gray-500 mb-6">Share your first experience!</p>
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:shadow-lg transition-all"
              >
                Share Your Story
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {stories.map(story => (
                <PostCard
                  key={story.id}
                  type="story"
                  post={story}
                  onUpvote={() => handleUpvote(story.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

