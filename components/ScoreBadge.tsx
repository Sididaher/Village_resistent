interface ScoreBadgeProps {
  score: number;
  maxScore: number;
  percentage: number;
}

export default function ScoreBadge({ score, maxScore, percentage }: ScoreBadgeProps) {
  const getColor = () => {
    if (percentage === 100) return 'from-green-400 to-emerald-600';
    if (percentage >= 60) return 'from-blue-400 to-cyan-600';
    return 'from-red-400 to-orange-600';
  };

  const getEmoji = () => {
    if (percentage === 100) return '🏆';
    if (percentage >= 60) return '🛡️';
    return '⚠️';
  };

  return (
    <div className={`bg-gradient-to-br ${getColor()} rounded-2xl shadow-2xl p-8 text-white text-center`}>
      <div className="text-6xl mb-4">{getEmoji()}</div>
      <div className="text-6xl font-bold mb-2">
        {score}/{maxScore}
      </div>
      <div className="text-2xl font-semibold opacity-90">
        {Math.round(percentage)}% Resistant
      </div>
    </div>
  );
}
