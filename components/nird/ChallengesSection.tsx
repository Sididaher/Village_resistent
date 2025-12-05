"use client";

import { useState } from "react";
import GameCard from "./GameCard";
import QuizGame from "./QuizGame";
import MiniGame from "./MiniGame";
import Toast from "./Toast";
import Button from "./Button";

interface GameProgress {
  [gameId: string]: {
    completed: boolean;
    score?: number;
    bestScore?: number;
  }
}

export default function ChallengesSection() {
  const [gameProgress, setGameProgress] = useState<GameProgress>({});
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [currentMiniGame, setCurrentMiniGame] = useState<{id: string, title: string, description: string} | null>(null);
  const [totalScore, setTotalScore] = useState(0);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [toast, setToast] = useState<{message: string, type: "success" | "info" | "warning" | "error", isVisible: boolean}>({
    message: "",
    type: "success",
    isVisible: false
  });

  const games = [
    {
      id: "quiz-nird",
      title: "Quiz NIRD Expert",
      description: "Testez vos connaissances sur la démarche NIRD et découvrez les enjeux du numérique libre dans l'éducation.",
      icon: "🧠",
      difficulty: "Moyen" as const,
      points: 500,
      category: "Écologie" as const,
      locked: false,
    },
    {
      id: "linux-discovery",
      title: "Découverte Linux",
      description: "Apprenez les bases de Linux et découvrez pourquoi c'est l'alternative parfaite aux systèmes propriétaires.",
      icon: "🐧",
      difficulty: "Facile" as const,
      points: 300,
      category: "Linux" as const,
      locked: !gameProgress["quiz-nird"]?.completed,
    },
    {
      id: "big-tech-escape",
      title: "Échapper aux Big Tech",
      description: "Défi stratégique : aidez un établissement scolaire à réduire sa dépendance aux géants du numérique.",
      icon: "🏃‍♂️",
      difficulty: "Difficile" as const,
      points: 750,
      category: "Économie" as const,
      locked: !gameProgress["linux-discovery"]?.completed,
    },
    {
      id: "data-protection",
      title: "Gardien des Données",
      description: "Mini-jeu sur la protection des données personnelles et la souveraineté numérique européenne.",
      icon: "🛡️",
      difficulty: "Moyen" as const,
      points: 400,
      category: "Sécurité" as const,
      locked: !gameProgress["quiz-nird"]?.completed,
    },
    {
      id: "green-computing",
      title: "Héros Numérique Vert",
      description: "Simulez l'impact écologique des choix technologiques et optimisez la sobriété numérique.",
      icon: "🌱",
      difficulty: "Facile" as const,
      points: 350,
      category: "Écologie" as const,
      locked: false,
    },
    {
      id: "community-builder",
      title: "Bâtisseur de Communauté",
      description: "Défi final : créez et animez votre propre communauté NIRD dans votre établissement.",
      icon: "🏘️",
      difficulty: "Difficile" as const,
      points: 1000,
      category: "Économie" as const,
      locked: Object.keys(gameProgress).filter(key => gameProgress[key]?.completed).length < 3,
    },
  ];

  const showToast = (message: string, type: "success" | "info" | "warning" | "error") => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const handleGameClick = (gameId: string) => {
    const game = games.find(g => g.id === gameId);
    if (!game || game.locked) {
      showToast("🔒 Ce défi est verrouillé ! Complétez les défis précédents pour le débloquer.", "warning");
      return;
    }
    
    if (gameId === "quiz-nird") {
      setCurrentGame("quiz");
    } else {
      // Ouvrir le mini-jeu approprié
      setCurrentMiniGame({
        id: gameId,
        title: game.title,
        description: game.description
      });
    }
  };

  const handleMiniGameComplete = (score: number) => {
    if (!currentMiniGame) return;
    
    const newProgress = {
      ...gameProgress,
      [currentMiniGame.id]: {
        completed: true,
        score: score,
        bestScore: Math.max(score, gameProgress[currentMiniGame.id]?.bestScore || 0)
      }
    };
    setGameProgress(newProgress);
    setTotalScore(totalScore + score);
    setCurrentMiniGame(null);
    
    // Afficher toast de félicitations
    showToast(`🎉 Défi "${currentMiniGame.title}" terminé ! +${score} points !`, "success");
    
    // Vérifier si de nouveaux défis sont débloqués
    setTimeout(() => {
      const unlockedCount = Object.keys(newProgress).filter(key => newProgress[key]?.completed).length;
      if (unlockedCount >= 1 && unlockedCount <= 3) {
        showToast("🔓 Nouveaux défis débloqués ! Explorez-les maintenant !", "info");
      }
    }, 2000);
  };

  const handleQuizComplete = (score: number) => {
    const newProgress = {
      ...gameProgress,
      "quiz-nird": {
        completed: true,
        score: score,
        bestScore: Math.max(score, gameProgress["quiz-nird"]?.bestScore || 0)
      }
    };
    setGameProgress(newProgress);
    setTotalScore(totalScore + score);
    setCurrentGame(null);
    
    // Afficher toast de félicitations
    showToast(`🎉 Quiz NIRD Expert terminé ! +${score} points !`, "success");
    
    // Débloquer les jeux suivants
    setTimeout(() => {
      showToast("🔓 De nouveaux défis sont maintenant débloqués !", "info");
    }, 2000);
  };

  const handleGameClose = () => {
    setCurrentGame(null);
  };

  const handleMiniGameClose = () => {
    setCurrentMiniGame(null);
  };

  const completedGames = Object.keys(gameProgress).filter(key => gameProgress[key]?.completed).length;
  const totalGames = games.length;
  const progressPercentage = (completedGames / totalGames) * 100;

  const getPlayerLevel = () => {
    if (totalScore >= 2000) return { level: "🏆 Maître NIRD", color: "text-yellow-600" };
    if (totalScore >= 1000) return { level: "🥇 Expert NIRD", color: "text-purple-600" };
    if (totalScore >= 500) return { level: "🥈 Initié NIRD", color: "text-blue-600" };
    return { level: "🥉 Apprenti NIRD", color: "text-green-600" };
  };

  const playerLevel = getPlayerLevel();

  return (
    <section id="challenges" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Décorations de fond */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-200 rounded-full opacity-20 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-emerald-200 rounded-full opacity-20 blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-teal-200 rounded-full opacity-10 blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* En-tête avec statistiques du joueur */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6">
            🎮 Zone des Défis NIRD
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Relevez nos défis ludiques et interactifs pour devenir un expert de la démarche NIRD !
            Apprenez en vous amusant et déverrouillez de nouveaux contenus.
          </p>
          
          {/* Tableau de bord du joueur */}
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto border-2 border-purple-100">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">{totalScore}</div>
                <div className="text-sm text-gray-600">Points Total</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">{completedGames}</div>
                <div className="text-sm text-gray-600">Défis Complétés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-600 mb-2">{Math.round(progressPercentage)}%</div>
                <div className="text-sm text-gray-600">Progression</div>
              </div>
              <div className="text-center">
                <div className={`text-lg font-bold mb-2 ${playerLevel.color}`}>{playerLevel.level}</div>
                <div className="text-sm text-gray-600">Niveau Actuel</div>
              </div>
            </div>
            
            {/* Barre de progression globale */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Progression générale</span>
                <span className="text-sm text-gray-500">{completedGames}/{totalGames} défis</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-emerald-500 h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button 
            onClick={() => setShowLeaderboard(!showLeaderboard)}
            variant="outline"
            className="border-purple-500 text-purple-600 hover:bg-purple-50"
          >
            <span className="mr-2">🏆</span>
            Classement
          </Button>
          <Button 
            variant="outline"
            className="border-emerald-500 text-emerald-600 hover:bg-emerald-50"
          >
            <span className="mr-2">📊</span>
            Mes Statistiques
          </Button>
          <Button 
            variant="outline"
            className="border-teal-500 text-teal-600 hover:bg-teal-50"
          >
            <span className="mr-2">🎯</span>
            Objectifs
          </Button>
        </div>

        {/* Grille des jeux */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {games.map((game) => (
            <GameCard
              key={game.id}
              title={game.title}
              description={game.description}
              icon={game.icon}
              difficulty={game.difficulty}
              points={game.points}
              category={game.category}
              onClick={() => handleGameClick(game.id)}
              completed={gameProgress[game.id]?.completed || false}
              locked={game.locked}
            />
          ))}
        </div>

        {/* Message d'encouragement */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-600 to-emerald-600 rounded-2xl p-8 text-white max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">🚀 Continuez l'aventure !</h3>
            <p className="text-lg opacity-90 mb-6">
              Chaque défi complété vous rapproche d'un numérique plus libre et durable. 
              Relevez tous les défis pour devenir un Maître NIRD !
            </p>
            <div className="flex justify-center">
              <Button 
                onClick={() => handleGameClick("quiz-nird")}
                className="bg-white text-purple-700 hover:bg-gray-100"
              >
                <span className="mr-2">🎯</span>
                Commencer maintenant
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal du Quiz */}
      {currentGame === "quiz" && (
        <QuizGame onComplete={handleQuizComplete} onClose={handleGameClose} />
      )}

      {/* Modal des Mini-Jeux */}
      {currentMiniGame && (
        <MiniGame 
          gameId={currentMiniGame.id}
          title={currentMiniGame.title}
          description={currentMiniGame.description}
          onComplete={handleMiniGameComplete}
          onClose={handleMiniGameClose}
        />
      )}

      {/* Toast de notifications */}
      <Toast 
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </section>
  );
}
