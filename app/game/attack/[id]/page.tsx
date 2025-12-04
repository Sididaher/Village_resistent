'use client';

import { useParams, useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import AttackCard from '@/components/AttackCard';
import HeartsBar from '@/components/HeartsBar';
import ProgressBar from '@/components/ProgressBar';
import { useGame } from '@/lib/context/GameContext';
import { attacks, INITIAL_HEARTS } from '@/lib/data/attacks';

export default function AttackPage() {
  const params = useParams();
  const router = useRouter();
  const { gameState, makeChoice } = useGame();

  const attackId = parseInt(params.id as string);
  const attack = attacks.find(a => a.id === attackId);

  if (!attack) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Attack Not Found</h1>
          <p className="text-gray-600 mb-6">This attack doesn&apos;t exist.</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Return Home
          </button>
        </div>
      </Layout>
    );
  }

  const handleChoice = (isGoodChoice: boolean) => {
    makeChoice(isGoodChoice);

    setTimeout(() => {
      if (attackId < attacks.length) {
        router.push(`/game/attack/${attackId + 1}`);
      } else {
        router.push('/result');
      }
    }, 2500);
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto py-8">
        <div className="mb-8 space-y-4">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <HeartsBar hearts={gameState.hearts} maxHearts={INITIAL_HEARTS} />
            <div className="text-sm font-medium text-gray-700">
              Score: {gameState.score}/{gameState.currentAttackIndex}
            </div>
          </div>
          <ProgressBar current={attackId} total={attacks.length} />
        </div>

        <AttackCard
          title={attack.title}
          description={attack.description}
          goodOption={attack.goodOption}
          badOption={attack.badOption}
          onChoice={handleChoice}
        />

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Choose wisely to protect your village&apos;s independence!
          </p>
        </div>
      </div>
    </Layout>
  );
}
