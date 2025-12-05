"use client";

import { useState, useEffect } from "react";
import Button from "./Button";

interface MiniGameProps {
  gameId: string;
  title: string;
  description: string;
  onComplete: (score: number) => void;
  onClose: () => void;
}

interface GameScenario {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
}

const gameScenarios: { [key: string]: GameScenario[] } = {
  "linux-discovery": [
    {
      question: "Quel est l'avantage principal de Linux pour les établissements scolaires ?",
      options: ["Gratuité totale", "Interface identique à Windows", "Compatibilité parfaite", "Publicité intégrée"],
      correctAnswer: 0,
      explanation: "Linux est entièrement gratuit, permettant aux établissements d'économiser sur les licences !",
      points: 100
    },
    {
      question: "Que signifie 'Open Source' ?",
      options: ["Code fermé", "Code source ouvert", "Code payant", "Code publicitaire"],
      correctAnswer: 1,
      explanation: "Open Source signifie que le code est ouvert, modifiable et auditable par tous !",
      points: 100
    },
    {
      question: "Quelle distribution Linux est idéale pour débuter dans l'éducation ?",
      options: ["Ubuntu", "Arch Linux", "Gentoo", "Linux From Scratch"],
      correctAnswer: 0,
      explanation: "Ubuntu est convivial et dispose d'une grande communauté d'aide !",
      points: 100
    }
  ],
  "big-tech-escape": [
    {
      question: "Votre établissement utilise Google Workspace. Quelle alternative libre choisir ?",
      options: ["Microsoft 365", "NextCloud + OnlyOffice", "Dropbox", "iCloud"],
      correctAnswer: 1,
      explanation: "NextCloud + OnlyOffice offre une suite complète libre et souveraine !",
      points: 150
    },
    {
      question: "Pour remplacer Zoom, quelle solution NIRD recommander ?",
      options: ["Skype", "BigBlueButton", "Teams", "Discord"],
      correctAnswer: 1,
      explanation: "BigBlueButton est spécialement conçu pour l'éducation et entièrement libre !",
      points: 150
    },
    {
      question: "Combien peut économiser un lycée de 1000 élèves en passant au libre ?",
      options: ["5 000€/an", "50 000€/an", "100 000€/an", "200 000€/an"],
      correctAnswer: 2,
      explanation: "Un lycée peut économiser jusqu'à 100 000€/an en licences et matériel !",
      points: 150
    }
  ],
  "data-protection": [
    {
      question: "Où sont stockées les données des élèves avec Google Education ?",
      options: ["En France", "Dans l'UE", "Aux États-Unis", "Partout dans le monde"],
      correctAnswer: 2,
      explanation: "Les données sont stockées aux États-Unis, hors de la juridiction européenne !",
      points: 125
    },
    {
      question: "Que dit le RGPD sur les données des mineurs ?",
      options: ["Pas de protection spéciale", "Protection renforcée obligatoire", "Interdit totalement", "Autorisation parentale suffisante"],
      correctAnswer: 1,
      explanation: "Le RGPD impose une protection renforcée pour les données des mineurs !",
      points: 125
    },
    {
      question: "Quelle solution permet de garder les données en France ?",
      options: ["Office 365", "Google Workspace", "Moodle auto-hébergé", "Slack"],
      correctAnswer: 2,
      explanation: "L'auto-hébergement avec Moodle garde toutes les données sur le territoire !",
      points: 125
    }
  ],
  "green-computing": [
    {
      question: "Combien d'années de vie supplémentaire Linux peut-il donner à un PC ?",
      options: ["1 an", "3-5 ans", "10 ans", "Indéfiniment"],
      correctAnswer: 1,
      explanation: "Linux peut prolonger la vie d'un PC de 3 à 5 ans en moyenne !",
      points: 90
    },
    {
      question: "Quelle est l'empreinte carbone d'un PC reconditionné vs neuf ?",
      options: ["Identique", "50% moindre", "80% moindre", "10% moindre"],
      correctAnswer: 2,
      explanation: "Un PC reconditionné a une empreinte carbone 80% inférieure !",
      points: 90
    },
    {
      question: "Combien de tonnes de CO₂ le Lycée Carnot a-t-il économisé ?",
      options: ["5 tonnes", "50 tonnes", "100 tonnes", "500 tonnes"],
      correctAnswer: 2,
      explanation: "Le Lycée Carnot a économisé plus de 100 tonnes de CO₂ !",
      points: 90
    }
  ],
  "community-builder": [
    {
      question: "Comment motiver les enseignants à adopter le libre ?",
      options: ["Les forcer", "Formation + accompagnement", "Changer tout d'un coup", "Les ignorer"],
      correctAnswer: 1,
      explanation: "La formation et l'accompagnement sont essentiels pour l'adoption !",
      points: 200
    },
    {
      question: "Quelle est la première étape d'une transition NIRD ?",
      options: ["Changer tous les PC", "Sensibiliser les équipes", "Acheter des serveurs", "Former les élèves"],
      correctAnswer: 1,
      explanation: "La sensibilisation des équipes est le fondement de toute transition !",
      points: 200
    },
    {
      question: "Comment impliquer les élèves dans la démarche NIRD ?",
      options: ["Les laisser faire", "Club informatique + éco-délégués", "Cours obligatoires", "Sanctions"],
      correctAnswer: 1,
      explanation: "Les clubs et éco-délégués sont des leviers d'engagement formidables !",
      points: 200
    }
  ]
};

export default function MiniGame({ gameId, title, description, onComplete, onClose }: MiniGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const scenarios = gameScenarios[gameId] || [];
  const current = scenarios[currentQuestion];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleConfirmAnswer = () => {
    if (selectedAnswer === null) return;
    
    const isCorrect = selectedAnswer === current.correctAnswer;
    if (isCorrect) {
      setScore(score + current.points);
    }
    
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < scenarios.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setGameCompleted(true);
    }
  };

  const handleGameComplete = () => {
    onComplete(score);
  };

  if (gameCompleted) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Défi terminé !</h2>
          <p className="text-xl text-gray-600 mb-6">
            Vous avez obtenu <span className="font-bold text-purple-600">{score}</span> points !
          </p>
          
          <div className="flex gap-4 justify-center">
            <Button onClick={handleGameComplete} className="bg-gradient-to-r from-purple-500 to-emerald-500">
              Valider le score
            </Button>
            <Button onClick={onClose} variant="outline">
              Fermer
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!current) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Jeu en construction</h2>
          <p className="text-gray-600 mb-6">Ce mini-jeu sera bientôt disponible !</p>
          <Button onClick={onClose} variant="outline">
            Fermer
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <p className="text-gray-600">{description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold w-8 h-8 flex items-center justify-center"
          >
            ×
          </button>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} sur {scenarios.length}</span>
            <span>Score: {score} pts</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / scenarios.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">{current.question}</h3>
          
          <div className="space-y-3">
            {current.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showExplanation && handleAnswerSelect(index)}
                disabled={showExplanation}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                  selectedAnswer === index
                    ? showExplanation
                      ? index === current.correctAnswer
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-red-500 bg-red-50 text-red-700"
                      : "border-purple-500 bg-purple-50 text-purple-700"
                    : showExplanation && index === current.correctAnswer
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-200 hover:border-gray-300 text-gray-700"
                } ${showExplanation ? "cursor-default" : "hover:bg-gray-50 cursor-pointer"}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">Explication :</h4>
            <p className="text-blue-700">{current.explanation}</p>
            {selectedAnswer === current.correctAnswer && (
              <div className="mt-2 text-green-600 font-semibold">
                +{current.points} points ! 🎉
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-4">
          {!showExplanation ? (
            <Button 
              onClick={handleConfirmAnswer}
              disabled={selectedAnswer === null}
              className="bg-gradient-to-r from-purple-500 to-emerald-500"
            >
              Valider
            </Button>
          ) : (
            <Button 
              onClick={handleNextQuestion}
              className="bg-gradient-to-r from-purple-500 to-emerald-500"
            >
              {currentQuestion < scenarios.length - 1 ? "Question suivante" : "Terminer"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
