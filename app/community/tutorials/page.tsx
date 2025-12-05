'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import PostCard from '@/components/community/PostCard';
import { getTutorials, saveTutorial, getUserName, getUserId } from '@/lib/utils/communityStorage';
import { awardXPForPosting } from '@/lib/utils/communityXP';
import { Tutorial } from '@/lib/types/community';
import { GraduationCap, Plus } from 'lucide-react';

export default function TutorialsPage() {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState<Tutorial['category']>('open-source');
  const [difficulty, setDifficulty] = useState<Tutorial['difficulty']>('beginner');
  const [tags, setTags] = useState('');

  useEffect(() => {
    loadTutorials();
  }, []);

  const loadTutorials = () => {
    const allTutorials = getTutorials();
    setTutorials(allTutorials.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTutorial: Tutorial = {
      id: `tutorial_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title,
      body,
      userId: getUserId(),
      userName: getUserName(),
      category,
      difficulty,
      tags: tags.split(',').map(t => t.trim()).filter(t => t),
      upvotes: 0,
      bookmarks: [],
      comments: [],
      views: 0,
      createdAt: new Date().toISOString()
    };

    saveTutorial(newTutorial);
    awardXPForPosting('tutorial');
    loadTutorials();
    setTitle('');
    setBody('');
    setTags('');
    setShowForm(false);
  };

  const handleUpvote = (tutorialId: string) => {
    const { upvoteTutorial } = require('@/lib/utils/communityStorage');
    upvoteTutorial(tutorialId);
    loadTutorials();
  };

  return (
    <Layout>
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <GraduationCap className="w-10 h-10 text-orange-600" />
                Tutorials
              </h1>
              <p className="text-gray-600">
                Learn from step-by-step guides written by the community. Earn XP for writing tutorials!
              </p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Write Tutorial
            </button>
          </div>

          {showForm && (
            <div className="bg-white rounded-xl shadow-xl p-6 mb-8 border-2 border-orange-200">
              <h2 className="text-2xl font-bold mb-4">Write a Tutorial</h2>
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
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                    placeholder="e.g., How to install Linux Mint (Beginner Guide)"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as Tutorial['category'])}
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                    >
                      <option value="linux">Linux</option>
                      <option value="open-source">Open Source</option>
                      <option value="sustainability">Sustainability</option>
                      <option value="productivity">Productivity</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Difficulty
                    </label>
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value as Tutorial['difficulty'])}
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Content (Markdown supported)
                  </label>
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                    rows={12}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 resize-none font-mono text-sm"
                    placeholder="Write your tutorial here. Use markdown for formatting..."
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
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                    placeholder="linux, installation, beginner"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
                  >
                    Publish Tutorial (+30 XP)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setTitle('');
                      setBody('');
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

          {tutorials.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl shadow-lg">
              <GraduationCap className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-xl text-gray-600 mb-2">No tutorials yet</p>
              <p className="text-gray-500 mb-6">Write the first tutorial and help the community!</p>
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl hover:shadow-lg transition-all"
              >
                Write Tutorial
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {tutorials.map(tutorial => (
                <PostCard
                  key={tutorial.id}
                  type="tutorial"
                  post={tutorial}
                  onUpvote={() => handleUpvote(tutorial.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

