interface HeartsBarProps {
  hearts: number;
  maxHearts: number;
}

export default function HeartsBar({ hearts, maxHearts }: HeartsBarProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700">Village Health:</span>
      <div className="flex gap-1">
        {Array.from({ length: maxHearts }).map((_, index) => (
          <span
            key={index}
            className={`text-2xl transition-all duration-300 ${
              index < hearts
                ? 'opacity-100 scale-100'
                : 'opacity-30 scale-90 grayscale'
            }`}
          >
            {index < hearts ? '❤️' : '🖤'}
          </span>
        ))}
      </div>
    </div>
  );
}
