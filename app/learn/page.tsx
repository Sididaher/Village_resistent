import Layout from '@/components/Layout';
import Link from 'next/link';

export default function LearnPage() {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Learn About NIRD
          </h1>
          <p className="text-xl text-gray-600">
            Digital Independence, Open-source Software, and Hardware Reuse
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">What is NIRD?</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            NIRD represents a philosophy and practical approach to technology in education
            that prioritizes sustainability, independence, and ethical choices. It stands
            for three core principles that can transform how schools manage their digital
            infrastructure.
          </p>
        </div>

        <div className="space-y-8 mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-start gap-4">
              <div className="text-5xl">🛡️</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                  Digital Independence
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Break free from vendor lock-in and proprietary systems that force schools
                  into expensive upgrade cycles. Digital independence means owning your data,
                  controlling your systems, and making technology choices based on educational
                  needs rather than corporate interests.
                </p>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="font-semibold text-green-900 mb-2">Benefits:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>No vendor lock-in or forced upgrades</li>
                    <li>Complete control over your data and privacy</li>
                    <li>Freedom to customize systems for your needs</li>
                    <li>No recurring licensing fees</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-start gap-4">
              <div className="text-5xl">🔓</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                  Open-source Software
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Use software that is free, transparent, and community-driven. Open-source
                  solutions like Linux, LibreOffice, and Moodle provide enterprise-grade
                  functionality without the cost, while fostering a culture of collaboration
                  and learning.
                </p>
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <p className="font-semibold text-blue-900 mb-2">Popular Open-source Solutions:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Operating Systems:</strong> Linux (Ubuntu, Linux Mint, Fedora)</li>
                    <li><strong>Office Suite:</strong> LibreOffice, OnlyOffice</li>
                    <li><strong>Learning Management:</strong> Moodle, Canvas LMS</li>
                    <li><strong>Cloud Storage:</strong> Nextcloud, ownCloud</li>
                    <li><strong>Communication:</strong> Jitsi Meet, Rocket.Chat</li>
                  </ul>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="font-semibold text-green-900 mb-2">Benefits:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Zero licensing costs</li>
                    <li>Transparent and auditable code</li>
                    <li>Strong security and privacy</li>
                    <li>Active community support</li>
                    <li>Regular updates and improvements</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-start gap-4">
              <div className="text-5xl">♻️</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                  Reuse Hardware
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Give old computers new life with lightweight Linux distributions. Instead
                  of discarding perfectly functional hardware, schools can extend device
                  lifespan by years, reducing costs and environmental impact.
                </p>
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <p className="font-semibold text-blue-900 mb-2">Lightweight Linux Distributions:</p>
                  <ul className="space-y-1 text-gray-700">
                    <li><strong>Lubuntu:</strong> Lightweight Ubuntu for older machines</li>
                    <li><strong>Linux Mint XFCE:</strong> User-friendly with low resource usage</li>
                    <li><strong>Puppy Linux:</strong> Extremely lightweight, runs from RAM</li>
                    <li><strong>antiX:</strong> Fast and light for very old hardware</li>
                  </ul>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="font-semibold text-green-900 mb-2">Benefits:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Massive cost savings on hardware purchases</li>
                    <li>Reduced electronic waste</li>
                    <li>Extended device lifespan (5-10+ years)</li>
                    <li>More devices available for students</li>
                    <li>Environmental sustainability</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Real-World Success Stories</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-6">
              <h4 className="font-bold text-lg mb-2 text-gray-900">Munich, Germany</h4>
              <p className="text-gray-700">
                The city of Munich migrated over 15,000 computers to Linux, saving millions
                in licensing fees while maintaining full functionality.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h4 className="font-bold text-lg mb-2 text-gray-900">Kerala, India</h4>
              <p className="text-gray-700">
                The state of Kerala implemented open-source software across all schools,
                providing quality education technology to millions of students at minimal cost.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h4 className="font-bold text-lg mb-2 text-gray-900">Spain</h4>
              <p className="text-gray-700">
                Multiple Spanish regions have adopted Linux and open-source software in schools,
                demonstrating that sustainable technology works at scale.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Getting Started with NIRD</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl font-bold text-green-600">1.</span>
              <div>
                <h4 className="font-bold mb-1">Assess Your Current Situation</h4>
                <p className="text-gray-700">
                  Inventory your hardware, software licenses, and identify pain points
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl font-bold text-green-600">2.</span>
              <div>
                <h4 className="font-bold mb-1">Start Small</h4>
                <p className="text-gray-700">
                  Pilot Linux on a few computers or one classroom before scaling up
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl font-bold text-green-600">3.</span>
              <div>
                <h4 className="font-bold mb-1">Train Your Team</h4>
                <p className="text-gray-700">
                  Provide training for teachers and IT staff on open-source tools
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl font-bold text-green-600">4.</span>
              <div>
                <h4 className="font-bold mb-1">Build Community</h4>
                <p className="text-gray-700">
                  Connect with other schools using NIRD principles for support and knowledge sharing
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl font-bold text-green-600">5.</span>
              <div>
                <h4 className="font-bold mb-1">Scale Gradually</h4>
                <p className="text-gray-700">
                  Expand your open-source infrastructure based on success and feedback
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/game/start"
            className="inline-block px-10 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white text-xl font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 mb-4"
          >
            Play the Game 🎮
          </Link>
          <p className="text-gray-600">
            Test your knowledge by defending a digital village!
          </p>
        </div>
      </div>
    </Layout>
  );
}
