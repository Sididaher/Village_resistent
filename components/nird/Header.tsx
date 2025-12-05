"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "Fonctionnalités", href: "#features" },
  { label: "Défis", href: "#challenges" },
  { label: "Parcours NIRD", href: "#parcours" },
  { label: "Partenaires", href: "#partners" },
  { label: "Témoignages", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Détecter la section active
      const sections = navItems
        .filter(item => item.href.startsWith("#"))
        .map(item => item.href.slice(1));
      
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      
      setActiveSection(currentSection || "");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.getElementById(href.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleNavClick = (href: string) => {
    if (href === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (href.startsWith("#")) {
      scrollToSection(href);
    } else {
      router.push(href);
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={() => handleNavClick("/")}
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9  from-purple-600 to-emerald-500 rounded-lg flex items-center justify-center">
             
            </div>
            <span className={`text-xl font-bold transition-colors ${
              isScrolled ? "text-gray-900" : "text-white"
            }`}>
            
            </span>
          </button>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1) || (item.href === "/" && activeSection === "");
              
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? isScrolled 
                        ? "bg-purple-100 text-purple-700" 
                        : "bg-white/20 text-white"
                      : isScrolled
                        ? "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="http://localhost:3001"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2 ${
                isScrolled ? "text-gray-600 hover:text-green-600" : "text-white/80 hover:text-white"
              }`}
            >
              <span>🏰</span>
              Village Résistant
            </a>
            <button
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                isScrolled ? "text-gray-600 hover:text-purple-600" : "text-white/80 hover:text-white"
              }`}
            >
              Contact
            </button>
            <button
              onClick={() => scrollToSection("#parcours")}
              className="px-5 py-2 bg-gradient-to-r from-purple-600 to-emerald-500 text-white text-sm font-semibold rounded-full hover:opacity-90 transition-opacity"
            >
              Commencer
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
              isScrolled ? "hover:bg-gray-100" : "hover:bg-white/10"
            }`}
            aria-label="Menu"
          >
            <div className="flex flex-col gap-1.5">
              <span className={`block w-5 h-0.5 rounded-full transition-all duration-300 ${isScrolled ? "bg-gray-700" : "bg-white"} ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-5 h-0.5 rounded-full transition-all duration-300 ${isScrolled ? "bg-gray-700" : "bg-white"} ${isMobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 rounded-full transition-all duration-300 ${isScrolled ? "bg-gray-700" : "bg-white"} ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-white border-t border-gray-100 transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-6 py-4">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1) || (item.href === "/" && activeSection === "");
              
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={`px-4 py-3 rounded-lg text-left font-medium transition-colors ${
                    isActive
                      ? "text-purple-600 bg-purple-50"
                      : "text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2">
            <a
              href="http://localhost:3001"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 text-gray-700 font-medium hover:text-green-600 transition-colors flex items-center justify-center gap-2"
            >
              <span>🏰</span>
              Village Résistant
            </a>
            <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-emerald-500 text-white font-semibold rounded-lg">
              Commencer
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
