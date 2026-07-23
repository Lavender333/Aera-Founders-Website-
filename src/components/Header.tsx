import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { AeraLogo } from './AeraLogo';
import { Menu, X, Volume2, VolumeX, Moon, Sun, Radio } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface HeaderProps {
  onOpenConsultation: (topic?: string) => void;
  onOpenSplash?: () => void;
  scrollPercent: number;
  currentSection: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenConsultation,
  onOpenSplash,
  scrollPercent,
  currentSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  const toggleDarkMode = () => {
    soundEngine.playClick();
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const navItems = [
    { label: 'Story', href: '#genesis', section: 'genesis' },
    { label: 'App Simulator', href: '#app-simulator', section: 'app-simulator' },
    { label: 'Platform', href: '#platform', section: 'platform' },
    { label: 'Enterprise', href: '#enterprise', section: 'enterprise' },
    { label: 'Trust', href: '#trust', section: 'trust' },
  ];

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="scroll-progress" aria-hidden="true">
        <span style={{ width: `${scrollPercent}%` }}></span>
      </div>

      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 py-3 ${
          isScrolled
            ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-[rgba(48,88,84,0.14)] dark:border-slate-800 shadow-sm'
            : 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between min-h-[58px]">
          {/* Brand Wordmark & Mesh Pill */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (onOpenSplash) onOpenSplash();
              }}
              className="flex items-center gap-3 text-[#305854] dark:text-emerald-400 font-black text-xl tracking-[0.2em] hover:opacity-90 transition-opacity text-left"
              aria-label="AERA Splash Screen & Home"
            >
              <AeraLogo size={38} />
              <span className="font-extrabold tracking-widest text-[#305854] dark:text-emerald-400">AERA</span>
            </button>

            {/* Live Mesh Status Pill */}
            <button
              onClick={() => {
                if (onOpenSplash) onOpenSplash();
              }}
              className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 text-[11px] font-mono text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>100% P2P Mesh Active</span>
            </button>
          </div>

          {/* Desktop Navigation Links & Controls */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-bold text-[#1c2b35] dark:text-slate-200">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => soundEngine.playClick()}
                className={`relative py-1 transition-colors hover:text-[#305854] dark:hover:text-emerald-400 ${
                  currentSection === item.section
                    ? 'text-[#305854] dark:text-emerald-400 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#8CBB5D] dark:after:bg-emerald-400'
                    : 'text-neutral-700 dark:text-slate-300'
                }`}
              >
                {item.label}
              </a>
            ))}

            {/* Audio Toggle Button */}
            <button
              onClick={toggleSound}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title={isMuted ? "Enable Tactical Audio FX" : "Mute Tactical Audio FX"}
              aria-label="Toggle Sound Effects"
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} className="text-emerald-500" />}
            </button>

            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title={isDarkMode ? "Switch to Executive Light Mode" : "Switch to Tactical Dark Mode"}
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => {
                soundEngine.playClick();
                onOpenConsultation();
              }}
              className="btn btn-primary text-sm py-2 px-5 min-h-[44px] ml-1 shadow-md"
              type="button"
            >
              Discuss AERA
            </button>
          </nav>

          {/* Mobile Menu Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleSound}
              className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 touch-manipulation active:bg-slate-200"
              aria-label="Toggle Sound"
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} className="text-emerald-500" />}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 touch-manipulation active:bg-slate-200"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-11 h-11 rounded-full border border-[rgba(48,88,84,0.2)] bg-white dark:bg-slate-900 flex items-center justify-center text-[#305854] dark:text-emerald-400 hover:bg-[#F3F8F5] dark:hover:bg-slate-800 transition-colors touch-manipulation active:scale-90"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-[rgba(48,88,84,0.18)] dark:border-slate-800 shadow-lg px-6 py-6 flex flex-col gap-4 z-50">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 text-base font-bold transition-colors ${
                  currentSection === item.section ? 'text-[#305854] dark:text-emerald-400' : 'text-neutral-800 dark:text-slate-200'
                }`}
              >
                {item.label}
              </a>
            ))}
            {onOpenSplash && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSplash();
                }}
                className="py-2 text-left text-base font-bold text-emerald-700 dark:text-emerald-400"
              >
                View Splash Screen
              </button>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="btn btn-primary w-full mt-2"
              type="button"
            >
              Discuss AERA
            </button>
          </div>
        )}
      </header>
    </>
  );
};

