"use client";

import { useState } from "react";
import Button from "./Button";

interface GameCardProps {
  title: string;
  description: string;
  icon: string;
  difficulty: "Facile" | "Moyen" | "Difficile";
  points: number;
  category: "Linux" | "Écologie" | "Sécurité" | "Économie";
  onClick: () => void;
  completed?: boolean;
  locked?: boolean;
}

export default function GameCard({
  title,
  description,
  icon,
  difficulty,
  points,
  category,
  onClick,
  completed = false,
  locked = false
}: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "Facile": return "text-green-500 border-green-500";
      case "Moyen": return "text-yellow-500 border-yellow-500";
      case "Difficile": return "text-red-500 border-red-500";
      default: return "text-gray-500 border-gray-500";
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "Linux": return "bg-blue-100 text-blue-700";
      case "Écologie": return "bg-green-100 text-green-700";
      case "Sécurité": return "bg-red-100 text-red-700";
      case "Économie": return "bg-purple-100 text-purple-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div 
      className={`relative group bg-white rounded-2xl border-2 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
        locked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer transform hover:scale-105'
      } ${completed ? 'border-green-400' : 'border-gray-200 hover:border-purple-400'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => !locked && onClick()}
    >
      {/* Effet de brillance */}
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
        isHovered ? 'animate-pulse' : ''
      }`} />
      
      {/* Badge de statut */}
      {completed && (
        <div className="absolute top-4 right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center z-10">
          <span className="text-white text-sm">✓</span>
        </div>
      )}
      
      {locked && (
        <div className="absolute top-4 right-4 w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center z-10">
          <span className="text-white text-sm">🔒</span>
        </div>
      )}

      <div className="p-6">
        {/* En-tête avec icône et catégorie */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-4xl transform group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getCategoryColor(category)}`}>
            {category}
          </span>
        </div>

        {/* Titre et description */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {description}
        </p>

        {/* Méta-informations */}
        <div className="flex items-center justify-between mb-4">
          <div className={`flex items-center gap-2 px-3 py-1 border rounded-full text-sm font-medium ${getDifficultyColor(difficulty)}`}>
            <div className="w-2 h-2 rounded-full bg-current" />
            {difficulty}
          </div>
          <div className="flex items-center gap-1 text-orange-600 font-bold">
            <span>🏆</span>
            <span>{points} pts</span>
          </div>
        </div>

        {/* Bouton d'action */}
        <Button
          onClick={(e) => {
            e?.stopPropagation();
            if (!locked) onClick();
          }}
          className={`w-full ${
            locked 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : completed
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 text-white'
          } transition-all duration-300`}
          disabled={locked}
        >
          {locked ? (
            <span className="flex items-center justify-center">
              <span className="mr-2">🔒</span>
              Verrouillé
            </span>
          ) : completed ? (
            <span className="flex items-center justify-center">
              <span className="mr-2">🔄</span>
              Rejouer
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <span className="mr-2">🎮</span>
              Jouer
            </span>
          )}
        </Button>
      </div>

      {/* Effet de particules sur hover */}
      {isHovered && !locked && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full animate-ping"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
