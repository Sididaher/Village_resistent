'use client';

import { useState } from 'react';
import { MiniScenario } from '@/lib/types/challenge';

interface ScenarioCardProps {
  scenario: MiniScenario;
  onComplete: (earnedXP: number) => void;
}

export default function ScenarioCard({ scenario, onComplete }: ScenarioCardProps) {
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleChoice = (choiceIndex: number) => {
    setSelectedChoice(choiceIndex);
    setShowFeedback(true);

    setTimeout(() => {
      setShowExplanation(true);

      // Award XP if optimal choice
      if (scenario.choices[choiceIndex].isOptimal) {
        onComplete(scenario.xpReward);
      } else {
        onComplete(Math.floor(scenario.xpReward / 2)); // Half XP for non-optimal choices
      }
    }, 2000);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'sustainability': 'from-green-500 to-emerald-600',
      'vendor-management': 'from-blue-500 to-indigo-600',
      'decision-making': 'from-purple-500 to-pink-600',
      'cost-analysis': 'from-orange-500 to-red-600'
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const getCategoryBadgeColor = (category: string) => {
    const colors = {
      'sustainability': 'bg-green-100 text-green-800 border-green-300',
      'vendor-management': 'bg-blue-100 text-blue-800 border-blue-300',
      'decision-making': 'bg-purple-100 text-purple-800 border-purple-300',
      'cost-analysis': 'bg-orange-100 text-orange-800 border-orange-300'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  return (
    <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 max-w-4xl w-full mx-auto border-2 md:border-4 border-gray-200">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3 md:mb-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
            {scenario.title}
          </h2>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full border-2 ${getCategoryBadgeColor(scenario.category)}`}>
            {scenario.category.replace('-', ' ').toUpperCase()}
          </span>
        </div>
        <p className="text-sm sm:text-base text-gray-600 italic mb-4">
          {scenario.description}
        </p>
        <div className={`bg-gradient-to-r ${getCategoryColor(scenario.category)} text-white p-4 md:p-5 rounded-lg`}>
          <p className="text-sm sm:text-base leading-relaxed font-medium">
            {scenario.situation}
          </p>
        </div>
      </div>

      {/* Choices */}
      <div className="space-y-3 md:space-y-4 mb-6">
        {scenario.choices.map((choice, index) => {
          const isSelected = selectedChoice === index;
          const isOptimal = choice.isOptimal;
          const showResult = isSelected && showFeedback;

          return (
            <button
              key={choice.id}
              onClick={() => handleChoice(index)}
              disabled={selectedChoice !== null}
              className={`w-full p-4 sm:p-5 rounded-lg md:rounded-xl text-left transition-all duration-300 border-2 ${
                showResult && isOptimal
                  ? 'bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-500 shadow-xl ring-2 md:ring-4 ring-emerald-300'
                  : showResult && !isOptimal
                  ? 'bg-gradient-to-br from-red-50 to-orange-50 border-red-500 shadow-xl ring-2 md:ring-4 ring-red-300'
                  : selectedChoice !== null
                  ? 'opacity-40 cursor-not-allowed bg-gray-50 border-gray-300'
                  : 'bg-gradient-to-br from-white to-gray-50 border-gray-300 hover:border-blue-400 hover:shadow-lg hover:scale-102 cursor-pointer'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className={`text-xl sm:text-2xl font-bold flex-shrink-0 ${
                  showResult && isOptimal ? 'text-emerald-600' :
                  showResult && !isOptimal ? 'text-red-600' :
                  'text-gray-400'
                }`}>
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold text-sm sm:text-base mb-2 ${
                    showResult && isOptimal ? 'text-emerald-900' :
                    showResult && !isOptimal ? 'text-red-900' :
                    'text-gray-900'
                  }`}>
                    {choice.text}
                  </p>

                  {showResult && (
                    <div className="mt-3 animate-fade-in">
                      <div className={`p-3 rounded-lg border-2 ${
                        isOptimal
                          ? 'bg-emerald-100 border-emerald-400'
                          : 'bg-red-100 border-red-400'
                      }`}>
                        <p className={`text-xs sm:text-sm font-semibold mb-2 flex items-start gap-2 ${
                          isOptimal ? 'text-emerald-900' : 'text-red-900'
                        }`}>
                          <span className="text-base sm:text-lg flex-shrink-0">
                            {isOptimal ? '✓' : '✗'}
                          </span>
                          <span>{choice.feedback}</span>
                        </p>
                        {choice.consequence && (
                          <p className={`text-xs sm:text-sm mt-2 pl-6 ${
                            isOptimal ? 'text-emerald-800' : 'text-red-800'
                          }`}>
                            <strong>Consequence:</strong> {choice.consequence}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className="mt-6 p-4 sm:p-5 md:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-lg md:rounded-xl animate-fade-in">
          <div className="flex items-start gap-3 mb-3">
            <span className="text-2xl sm:text-3xl">💡</span>
            <h3 className="text-base sm:text-lg font-bold text-blue-900">
              Learning Point
            </h3>
          </div>
          <p className="text-sm sm:text-base text-blue-900 leading-relaxed pl-10">
            {scenario.explanation}
          </p>

          {selectedChoice !== null && scenario.choices[selectedChoice].isOptimal && (
            <div className="mt-4 flex items-center gap-2 pl-10">
              <span className="text-lg">🎉</span>
              <span className="text-sm sm:text-base font-bold text-emerald-700">
                +{scenario.xpReward} XP earned!
              </span>
            </div>
          )}
          {selectedChoice !== null && !scenario.choices[selectedChoice].isOptimal && (
            <div className="mt-4 flex items-center gap-2 pl-10">
              <span className="text-lg">📚</span>
              <span className="text-sm sm:text-base font-semibold text-orange-700">
                +{Math.floor(scenario.xpReward / 2)} XP earned (Learn from this experience!)
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
