'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { getIdeas, getStories, getTools, getTutorials } from '@/lib/utils/communityStorage';
import { Idea, Story, Tool, Tutorial } from '@/lib/types/community';
import { Lightbulb, BookOpen, Wrench, GraduationCap, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function CommunityPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);

  useEffect(() => {
    setIdeas(getIdeas());
    setStories(getStories());
    setTools(getTools());
    setTutorials(getTutorials());
  }, []);

  const recentIdeas = ideas.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3);
  const recentStories = stories.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3);
  const topTools = tools.sort((a, b) => b.rating - a.rating).slice(0, 3);
  const recentTutorials = tutorials.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3);

  return (
    <Layout>
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Community Hub
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              Share knowledge, ideas, and experiences with the NIRD community. Learn together and grow!
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200">
              <Lightbulb className="w-8 h-8 text-blue-600 mb-2" />
              <div className="text-2xl font-bold text-gray-900">{ideas.length}</div>
              <div className="text-sm text-gray-600">Ideas</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
              <BookOpen className="w-8 h-8 text-green-600 mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stories.length}</div>
              <div className="text-sm text-gray-600">Stories</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200">
              <Wrench className="w-8 h-8 text-purple-600 mb-2" />
              <div className="text-2xl font-bold text-gray-900">{tools.length}</div>
              <div className="text-sm text-gray-600">Tools</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-orange-200">
              <GraduationCap className="w-8 h-8 text-orange-600 mb-2" />
              <div className="text-2xl font-bold text-gray-900">{tutorials.length}</div>
              <div className="text-sm text-gray-600">Tutorials</div>
            </div>
          </div>

          {/* Main Sections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Ideas Board */}
            <Link href="/community/ideas" className="group">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-xl border-2 border-blue-200 hover:border-blue-400 transition-all hover:shadow-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                    <Lightbulb className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Ideas Board</h2>
                    <p className="text-gray-600">{ideas.length} ideas shared</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Share your ideas for living more sustainably, reducing digital waste, and improving the platform.
                </p>
                {recentIdeas.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-600">Recent ideas:</p>
                    {recentIdeas.map(idea => (
                      <div key={idea.id} className="bg-white rounded-lg p-3 text-sm">
                        <p className="font-medium text-gray-900">{idea.title}</p>
                        <p className="text-gray-600 text-xs mt-1">{idea.upvotes} upvotes</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Link>

            {/* Stories */}
            <Link href="/community/stories" className="group">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-xl border-2 border-green-200 hover:border-green-400 transition-all hover:shadow-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Experiences & Stories</h2>
                    <p className="text-gray-600">{stories.length} stories shared</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Share your journey with NIRD principles, challenges completed, and lessons learned.
                </p>
                {recentStories.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-600">Recent stories:</p>
                    {recentStories.map(story => (
                      <div key={story.id} className="bg-white rounded-lg p-3 text-sm">
                        <p className="font-medium text-gray-900">{story.title}</p>
                        <p className="text-gray-600 text-xs mt-1">{story.upvotes} upvotes</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Link>

            {/* Tools Library */}
            <Link href="/community/tools" className="group">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-xl border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center">
                    <Wrench className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Sustainable Tools</h2>
                    <p className="text-gray-600">{tools.length} tools shared</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Discover and share open-source tools, eco-friendly apps, and free alternatives.
                </p>
                {topTools.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-600">Top rated:</p>
                    {topTools.map(tool => (
                      <div key={tool.id} className="bg-white rounded-lg p-3 text-sm">
                        <p className="font-medium text-gray-900">{tool.name}</p>
                        <p className="text-gray-600 text-xs mt-1">⭐ {tool.rating.toFixed(1)} rating</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Link>

            {/* Tutorials */}
            <Link href="/community/tutorials" className="group">
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 shadow-xl border-2 border-orange-200 hover:border-orange-400 transition-all hover:shadow-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Tutorials</h2>
                    <p className="text-gray-600">{tutorials.length} tutorials</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Learn from step-by-step guides written by the community. Earn XP for writing tutorials!
                </p>
                {recentTutorials.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-600">Recent tutorials:</p>
                    {recentTutorials.map(tutorial => (
                      <div key={tutorial.id} className="bg-white rounded-lg p-3 text-sm">
                        <p className="font-medium text-gray-900">{tutorial.title}</p>
                        <p className="text-gray-600 text-xs mt-1">{tutorial.upvotes} upvotes</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          </div>

          {/* Weekly Highlights */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-8 h-8" />
              <h2 className="text-3xl font-bold">Weekly Highlights</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <p className="font-semibold mb-2">Best Idea of the Week</p>
                <p className="text-sm opacity-90">
                  {ideas.length > 0 
                    ? ideas.sort((a, b) => b.upvotes - a.upvotes)[0]?.title || 'No ideas yet'
                    : 'No ideas yet'}
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <p className="font-semibold mb-2">Most Useful Tutorial</p>
                <p className="text-sm opacity-90">
                  {tutorials.length > 0
                    ? tutorials.sort((a, b) => b.upvotes - a.upvotes)[0]?.title || 'No tutorials yet'
                    : 'No tutorials yet'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

