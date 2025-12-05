'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useState } from 'react';

interface LayoutProps {
  children: ReactNode;
  showNav?: boolean;
}

export default function Layout({ children, showNav = true }: LayoutProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/learn', label: 'Learn NIRD', icon: '📚' },
    { href: '/challenges', label: 'Challenges', icon: '🎯' },
    { href: '/badges', label: 'Badges', icon: '🏆' },
    { href: '/community', label: 'Community', icon: '👥' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-cyan-50">
      {showNav && (
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b-2 border-gradient-to-r from-green-500 via-blue-500 to-purple-500">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 md:h-20">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <span className="text-3xl md:text-4xl transition-transform duration-300 group-hover:scale-110 block">🏰</span>
                  <div className="absolute -inset-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                </div>
                <span className="text-xl md:text-2xl font-black bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Village Résistant
                </span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`
                      group relative px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300
                      ${isActive(link.href)
                        ? 'text-white bg-gradient-to-r from-green-500 to-blue-500 shadow-lg'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                      }
                    `}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-lg">{link.icon}</span>
                      <span>{link.label}</span>
                    </span>
                    {isActive(link.href) && (
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full" />
                    )}
                  </Link>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                <div className="space-y-1.5">
                  <span className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                  <span className={`block w-6 h-0.5 bg-gray-700 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                  <span className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </div>
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className={`
              lg:hidden overflow-hidden transition-all duration-300 ease-in-out
              ${mobileMenuOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'}
            `}>
              <div className="flex flex-col gap-2 pt-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`
                      px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300
                      ${isActive(link.href)
                        ? 'text-white bg-gradient-to-r from-green-500 to-blue-500 shadow-lg'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                      }
                    `}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-xl">{link.icon}</span>
                      <span>{link.label}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
      )}

      <main>
        {children}
      </main>

      <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white mt-20 border-t-4 border-gradient-to-r from-green-500 via-blue-500 to-purple-500">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Brand Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">🏰</span>
                <h3 className="text-2xl font-black bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  Village Résistant
                </h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Empowering schools with digital independence and sustainable technology through NIRD principles.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-green-400">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2">
                    <span>→</span>
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link href="/challenges" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2">
                    <span>→</span>
                    <span>Challenges</span>
                  </Link>
                </li>
                <li>
                  <Link href="/learn" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2">
                    <span>→</span>
                    <span>Learn NIRD</span>
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2">
                    <span>→</span>
                    <span>Community</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* NIRD Principles */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-blue-400">NIRD Principles</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-lg">🛡️</span>
                  <span>Digital Independence</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lg">♻️</span>
                  <span>Hardware Reuse</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lg">🔓</span>
                  <span>Open Source Software</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-400">
                Built to promote digital independence and sustainable technology in education
              </p>
              <p className="text-xs text-gray-500">
                © 2025 Village Résistant • Nuit de l'Info 2025
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
