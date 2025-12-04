'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { GameState, ScoreResult } from '../types/game';
import { attacks, INITIAL_HEARTS } from '../data/attacks';

interface GameContextType {
  gameState: GameState;
  makeChoice: (isGoodChoice: boolean) => void;
  resetGame: () => void;
  getResult: () => ScoreResult;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const initialGameState: GameState = {
  score: 0,
  hearts: INITIAL_HEARTS,
  currentAttackIndex: 0,
  selectedChoices: [],
  gameCompleted: false,
};

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const makeChoice = (isGoodChoice: boolean) => {
    setGameState((prev) => {
      const newScore = isGoodChoice ? prev.score + 1 : prev.score;
      const newHearts = isGoodChoice ? prev.hearts : Math.max(0, prev.hearts - 1);
      const newChoices = [...prev.selectedChoices, isGoodChoice];
      const nextIndex = prev.currentAttackIndex + 1;
      const isCompleted = nextIndex >= attacks.length;

      return {
        score: newScore,
        hearts: newHearts,
        currentAttackIndex: nextIndex,
        selectedChoices: newChoices,
        gameCompleted: isCompleted,
      };
    });
  };

  const resetGame = () => {
    setGameState(initialGameState);
  };

  const getResult = (): ScoreResult => {
    const maxScore = attacks.length;
    const percentage = (gameState.score / maxScore) * 100;

    let evaluation = '';
    let tips: string[] = [];

    if (percentage === 100) {
      evaluation = "100% Resistant School!";
      tips = [
        "Congratulations! You've mastered digital sustainability!",
        "Share your knowledge with other schools.",
        "Keep advocating for open-source solutions."
      ];
    } else if (percentage >= 60) {
      evaluation = "You're on the right track!";
      tips = [
        "Use Linux distributions like Ubuntu or Linux Mint.",
        "Recycle old hardware instead of buying new.",
        "Explore open-source alternatives for all software needs.",
        "Build a community around digital independence."
      ];
    } else {
      evaluation = "The tech empire has taken over...";
      tips = [
        "Learn about open-source software and its benefits.",
        "Consider LibreOffice instead of Microsoft Office.",
        "Explore Linux as a Windows alternative.",
        "Avoid vendor lock-in by choosing open standards.",
        "Reuse and recycle hardware to reduce costs and waste."
      ];
    }

    return {
      score: gameState.score,
      maxScore,
      percentage,
      evaluation,
      tips,
    };
  };

  return (
    <GameContext.Provider value={{ gameState, makeChoice, resetGame, getResult }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
