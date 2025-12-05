'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import PostCard from '@/components/community/PostCard';
import { getTools, saveTool, getUserName, getUserId } from '@/lib/utils/communityStorage';
import { awardXPForPosting } from '@/lib/utils/communityXP';
import { Tool } from '@/lib/types/community';
import { Wrench, Plus, Star } from 'lucide-react';

export default function ToolsPage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [category, setCategory] = useState<Tool['category']>('productivity');
  const [tags, setTags] = useState('');

  useEffect(() => {
    loadTools();
  }, []);

  const loadTools = () => {
    const allTools = getTools();
    setTools(allTools.sort((a, b) => b.rating - a.rating));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTool: Tool = {
      id: `tool_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      description,
      websiteUrl,
      category,
      tags: tags.split(',').map(t => t.trim()).filter(t => t),
      rating: 0,
      ratings: [],
      addedBy: getUserId(),
      addedByName: getUserName(),
      comments: [],
      createdAt: new Date().toISOString()
    };

    saveTool(newTool);
    awardXPForPosting('tool');
    loadTools();
    setName('');
    setDescription('');
    setWebsiteUrl('');
    setTags('');
    setShowForm(false);
  };

  return (
    <Layout>
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <Wrench className="w-10 h-10 text-purple-600" />
                Sustainable Tools Library
              </h1>
              <p className="text-gray-600">
                Discover and share open-source tools, eco-friendly apps, and free alternatives
              </p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Tool
            </button>
          </div>

          {showForm && (
            <div className="bg-white rounded-xl shadow-xl p-6 mb-8 border-2 border-purple-200">
              <h2 className="text-2xl font-bold mb-4">Add a Tool</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tool Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                    placeholder="e.g., LibreOffice"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={4}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 resize-none"
                    placeholder="What does this tool do? Why is it sustainable?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Website URL
                  </label>
                  <input
                    type="url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    required
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Tool['category'])}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  >
                    <option value="productivity">Productivity</option>
                    <option value="design">Design</option>
                    <option value="development">Development</option>
                    <option value="education">Education</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                    placeholder="open-source, beginner-friendly, free"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
                  >
                    Add Tool (+20 XP)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setName('');
                      setDescription('');
                      setWebsiteUrl('');
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

          {tools.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl shadow-lg">
              <Wrench className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-xl text-gray-600 mb-2">No tools yet</p>
              <p className="text-gray-500 mb-6">Be the first to share a sustainable tool!</p>
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:shadow-lg transition-all"
              >
                Add Your First Tool
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {tools.map(tool => (
                <PostCard
                  key={tool.id}
                  type="tool"
                  post={tool}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

