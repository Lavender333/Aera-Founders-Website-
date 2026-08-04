import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { AeraLogo } from './AeraLogo';
import { Menu, MonitorPlay, Moon, Sun, Volume2, VolumeX, X } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface HeaderProps {
  onOpenConsultation: (topic?: string) => void;
  onOpenPresentation: () => void;
  onOpenSplash?: () => void;
  scrollPercent: number;
  currentSection: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenConsultation,
  onOpenPresentation,
  onOpenSplash,
  scrollPercent,
  currentSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
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
    document.documentElement.classList.toggle('dark', nextDark);
  };

  const navItems = [
    { label: 'Vision', href: '#genesis', section: 'genesis' },
    { label: 'Legacy', href: '#legacy', section: 'legacy' },
    { label: 'POD Model', href: '#pod-model', section: 'pod-model' },
    { label: 'Platform', href: '#platform', section: 'platform' },
    { label: 'Trust', href: '#trust', section: 'trust' },
  ];

  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <span style={{ width: `${scrollPercent}%` }} />
      </div>

      <header
        className={`fixed left-0 top-0 z-50 w-full py-3 transition-all duration-300 ${
          isScrolled
            ? 'border-b border-[rgba(48,88,84,0.14)] bg-white/95 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/95'
            : 'bg-white/80 backdrop-blur-sm dark:bg-slate-950/80'
        }`}
      >
        <div className="container mx-auto flex min-h-[58px] items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenSplash}
              className="flex items-center gap-3 text-left text-xl font-black tracking-[0.2em] text-[#305854] transition-opacity hover:opacity-90 dark:text-emerald-400"
              aria-label="Open AERA splash screen"
              type="button"
            >
              <AeraLogo size={38} />
              <span className="font-extrabold tracking-widest">AERA</span>
            </button>

            <button
              onClick={onOpenSplash}
              className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-mono text-[11px] text-emerald-700 transition-colors hover:bg-emerald-100 dark:border-emerald-800/80 dark:bg-emerald-950/60 dark:text-emerald-300 sm:flex"
              type="button"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              <span>100% P2P Mesh Active</span>
            </button>
          </div>

          <nav className="hidden items-center gap-4 text-sm font-bold text-[#1c2b35] dark:text-slate-200 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => soundEngine.playClick()}
                className={`relative py-1 transition-colors hover:text-[#305854] dark:hover:text-emerald-400 ${
                  currentSection === item.section
                    ? 'text-[#305854] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#8CBB5D] after:content-[""] dark:text-emerald-400 dark:after:bg-emerald-400'
                    : 'text-neutral-700 dark:text-slate-300'
                }`}
              >
                {item.label}
              </a>
            ))}

            <button
              onClick={() => {
                soundEngine.playClick();
                onOpenPresentation();
              }}
              className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-[#305854]/20 bg-[#F3F8F5] px-4 text-xs font-black text-[#305854] transition-all hover:-translate-y-0.5 hover:border-[#305854]/40 hover:bg-white dark:border-emerald-700/50 dark:bg-emerald-950/40 dark:text-emerald-300"
              type="button"
            >
              <MonitorPlay size={16} />
              Presentation
            </button>

            <button
              onClick={toggleSound}
              className="rounded-xl bg-slate-100 p-2 text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              title={isMuted ? 'Enable Tactical Audio FX' : 'Mute Tactical Audio FX'}
              aria-label="Toggle sound effects"
              type="button"
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} className="text-emerald-500" />}
            </button>

            <button
              onClick={toggleDarkMode}
              className="rounded-xl bg-slate-100 p-2 text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              title={isDarkMode ? 'Switch to Executive Light Mode' : 'Switch to Tactical Dark Mode'}
              aria-label="Toggle dark mode"
              type="button"
            >
              {isDarkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => {
                soundEngine.playClick();
                onOpenConsultation();
              }}
              className="btn btn-primary ml-1 min-h-[44px] px-5 py-2 text-sm shadow-md"
              type="button"
            >
              Discuss AERA
            </button>
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="rounded-full bg-slate-100 p-2.5 text-slate-700 active:bg-slate-200 dark:bg-slate-800 dark:text-slate-200"
              aria-label="Toggle dark mode"
              type="button"
            >
              {isDarkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="flex h-11 w-11 touch-manipulation items-center justify-center rounded-full border border-[rgba(48,88,84,0.2)] bg-white text-[#305854] transition-colors active:scale-90 dark:bg-slate-900 dark:text-emerald-400"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              type="button"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="absolute left-0 top-full z-50 flex w-full flex-col gap-3 border-b border-[rgba(48,88,84,0.18)] bg-white px-6 py-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 lg:hidden">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPresentation();
              }}
              className="mb-2 flex items-center justify-between rounded-2xl bg-[#173D38] px-5 py-4 text-left text-sm font-black text-white"
              type="button"
            >
              <span>
                <span className="block text-[9px] uppercase tracking-[0.18em] text-[#B9E58B]">Executive walkthrough</span>
                View Presentation
              </span>
              <MonitorPlay size={21} />
            </button>

            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 text-base font-bold transition-colors ${
                  currentSection === item.section
                    ? 'text-[#305854] dark:text-emerald-400'
                    : 'text-neutral-800 dark:text-slate-200'
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
                type="button"
              >
                View Splash Screen
              </button>
            )}

            <div className="mt-2 flex items-center gap-2">
              <button
                onClick={toggleSound}
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                aria-label="Toggle sound"
                type="button"
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} className="text-emerald-500" />}
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="btn btn-primary flex-1"
                type="button"
              >
                Discuss AERA
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
