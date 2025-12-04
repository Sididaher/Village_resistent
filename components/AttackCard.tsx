'use client';

import { useState, useMemo } from 'react';

interface AttackCardProps {
  title: string;
  description: string;
  goodOption: {
    label: string;
    explanation: string;
  };
  badOption: {
    label: string;
    explanation: string;
  };
  onChoice: (isGoodChoice: boolean) => void;
}

interface Option {
  type: 'good' | 'bad';
  label: string;
  explanation: string;
  icon: string;
  title: string;
}

export default function AttackCard({
  title,
  description,
  goodOption,
  badOption,
  onChoice,
}: AttackCardProps) {
  const [selectedOption, setSelectedOption] = useState<'good' | 'bad' | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Randomize option order - memoized so it doesn't change on re-render
  const options = useMemo<[Option, Option]>(() => {
    const opts: [Option, Option] = [
      {
        type: 'good',
        label: goodOption.label,
        explanation: goodOption.explanation,
        icon: '💡',
        title: 'Option A'
      },
      {
        type: 'bad',
        label: badOption.label,
        explanation: badOption.explanation,
        icon: '💼',
        title: 'Option B'
      }
    ];

    // 50% chance to swap the order
    if (Math.random() > 0.5) {
      return [opts[1], opts[0]];
    }
    return opts;
  }, [goodOption, badOption]);

  const handleChoice = (isGood: boolean) => {
    setSelectedOption(isGood ? 'good' : 'bad');
    setShowExplanation(true);

    setTimeout(() => {
      onChoice(isGood);
    }, 2500);
  };

  const renderOption = (option: Option) => {
    const isGood = option.type === 'good';
    const isSelected = selectedOption === option.type;
    const isOtherSelected = selectedOption !== null && !isSelected;

    return (
      <button
        key={option.type}
        onClick={() => handleChoice(isGood)}
        disabled={selectedOption !== null}
        className={`w-full p-4 sm:p-5 md:p-6 rounded-lg md:rounded-xl text-left transition-all duration-300 border-2 ${
          isSelected && isGood
            ? 'bg-gradient-to-br from-emerald-100 to-green-100 border-emerald-600 shadow-2xl scale-105 ring-2 md:ring-4 ring-emerald-300'
            : isSelected && !isGood
            ? 'bg-gradient-to-br from-orange-100 to-red-100 border-orange-600 shadow-2xl scale-105 ring-2 md:ring-4 ring-orange-300'
            : isOtherSelected
            ? 'opacity-40 cursor-not-allowed grayscale'
            : 'bg-gradient-to-br from-gray-50 to-slate-50 border-gray-300 hover:border-blue-400 hover:shadow-xl hover:scale-102 cursor-pointer hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50'
        }`}
      >
        <div className="flex items-start gap-3 md:gap-4">
          <span className="text-3xl sm:text-4xl drop-shadow-lg flex-shrink-0">{option.icon}</span>
          <div className="flex-1 min-w-0">
            <h3 className={`font-bold text-lg sm:text-xl mb-1 md:mb-2 flex flex-wrap items-center gap-2 ${
              isSelected && isGood
                ? 'text-emerald-900'
                : isSelected && !isGood
                ? 'text-orange-900'
                : 'text-gray-900'
            }`}>
              {option.title}
              {isSelected && isGood && (
                <span className="text-xs bg-emerald-200 text-emerald-800 px-2 py-1 rounded-full font-semibold whitespace-nowrap">Sustainable</span>
              )}
              {isSelected && !isGood && (
                <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded-full font-semibold whitespace-nowrap">Costly</span>
              )}
            </h3>
            <p className={`font-medium text-sm sm:text-base ${
              isSelected && isGood
                ? 'text-emerald-900'
                : isSelected && !isGood
                ? 'text-orange-900'
                : 'text-gray-700'
            }`}>{option.label}</p>
            {isSelected && showExplanation && (
              <div className={`mt-3 md:mt-4 p-3 md:p-4 rounded-lg animate-fade-in border-2 ${
                isGood
                  ? 'bg-gradient-to-r from-emerald-200 to-green-200 border-emerald-400'
                  : 'bg-gradient-to-r from-orange-200 to-red-200 border-orange-400'
              }`}>
                <p className={`text-xs sm:text-sm font-semibold flex items-start gap-2 ${
                  isGood ? 'text-emerald-950' : 'text-orange-950'
                }`}>
                  <span className="text-base sm:text-lg flex-shrink-0">{isGood ? '✓' : '✗'}</span>
                  <span>{option.explanation}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </button>
    );
  };

  return (
    <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 max-w-3xl w-full mx-auto border-2 md:border-4 border-gray-200">
      <div className="mb-6 md:mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">{title}</h2>
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">{description}</p>
      </div>

      <div className="space-y-4 md:space-y-5">
        {options.map(option => renderOption(option))}
      </div>
    </div>
  );
}
