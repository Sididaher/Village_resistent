'use client';

import { useParams, useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import ChallengeDetail from '@/components/ChallengeDetail';
import { challenges } from '@/lib/data/challenges';

export default function ChallengeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const challengeId = parseInt(params.id as string);

  const challenge = challenges.find(c => c.id === challengeId);

  if (!challenge) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto py-8 text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Challenge Not Found</h1>
          <p className="text-gray-600 mb-6">This challenge doesn&apos;t exist.</p>
          <button
            onClick={() => router.push('/challenges')}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Back to Challenges
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen px-4 py-8">
        <ChallengeDetail challenge={challenge} />
      </div>
    </Layout>
  );
}
