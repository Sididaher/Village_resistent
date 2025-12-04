import Link from 'next/link';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  showNav?: boolean;
}

export default function Layout({ children, showNav = true }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-cyan-50">
      {showNav && (
        <nav className="bg-white shadow-md border-b-4 border-green-500">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <span className="text-3xl">🏰</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Village Résistant
                </span>
              </Link>
              <div className="flex gap-2 sm:gap-4 flex-wrap">
                <Link
                  href="/"
                  className="px-3 sm:px-4 py-2 text-gray-700 hover:text-green-600 font-medium transition-colors text-sm sm:text-base"
                >
                  Home
                </Link>
                <Link
                  href="/scenarios"
                  className="px-3 sm:px-4 py-2 text-gray-700 hover:text-purple-600 font-medium transition-colors text-sm sm:text-base"
                >
                  Scenarios
                </Link>
                <Link
                  href="/challenges"
                  className="px-3 sm:px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm sm:text-base"
                >
                  Challenges
                </Link>
                <Link
                  href="/learn"
                  className="px-3 sm:px-4 py-2 text-gray-700 hover:text-green-600 font-medium transition-colors text-sm sm:text-base"
                >
                  Learn
                </Link>
              </div>
            </div>
          </div>
        </nav>
      )}

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-white mt-16 border-t-4 border-green-500">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          <p className="text-sm">
            Built to promote digital independence and sustainable technology in education
          </p>
          <p className="text-xs mt-2 opacity-75">
            Supporting NIRD principles: Independence, Open-source, Reuse
          </p>
        </div>
      </footer>
    </div>
  );
}
