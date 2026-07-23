import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { HeroCinematic } from './components/HeroCinematic';
import { GenesisStory } from './components/GenesisStory';
import { FoundersSection } from './components/FoundersSection';
import { AeraAppSimulator } from './components/AeraAppSimulator';
import { PlatformWorkflows } from './components/PlatformWorkflows';
import { EnterpriseSection } from './components/EnterpriseSection';
import { TrustSection } from './components/TrustSection';
import { ClosingSection } from './components/ClosingSection';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { TrustResourceModal } from './components/TrustResourceModal';
import { SplashScreen } from './components/SplashScreen';
import { TrustResourceKey } from './types';

const sectionAnimation = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

export default function App() {
  const [scrollPercent, setScrollPercent] = useState<number>(0);
  const [currentSection, setCurrentSection] = useState<string>('top');
  const [showSplash, setShowSplash] = useState<boolean>(true);

  // Modal States
  const [consultationOpen, setConsultationOpen] = useState<boolean>(false);
  const [consultationTopic, setConsultationTopic] = useState<string>('');
  const [activeResource, setActiveResource] = useState<TrustResourceKey | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const totalHeight = doc.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollPercent(Math.min(100, Math.max(0, progress)));

      // Detect current active section
      const sections = ['top', 'genesis', 'founders', 'app-simulator', 'platform', 'enterprise', 'trust'];
      const marker = window.innerHeight * 0.4;
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= marker && rect.bottom >= 0) {
            setCurrentSection(sec);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenConsultation = (topic?: string) => {
    setConsultationTopic(topic || '');
    setConsultationOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col selection:bg-[#8CBB5D] selection:text-[#305854]">
      {/* Skip to Main Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[130] bg-[#305854] text-white px-4 py-2 rounded-full font-bold text-xs"
      >
        Skip to main content
      </a>

      {/* Splash Screen */}
      <AnimatePresence>
        {showSplash && (
          <SplashScreen
            onDismiss={() => setShowSplash(false)}
            registeredCount={14}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <Header
        onOpenConsultation={handleOpenConsultation}
        onOpenSplash={() => setShowSplash(true)}
        scrollPercent={scrollPercent}
        currentSection={currentSection}
      />

      {/* Main Content */}
      <main id="main-content" tabIndex={-1} className="flex-1">
        <HeroCinematic onExploreClick={() => setCurrentSection('app-simulator')} />
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionAnimation}
        >
          <GenesisStory />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionAnimation}
        >
          <FoundersSection />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionAnimation}
        >
          <AeraAppSimulator />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionAnimation}
        >
          <PlatformWorkflows />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionAnimation}
        >
          <EnterpriseSection onOpenConsultation={handleOpenConsultation} />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionAnimation}
        >
          <TrustSection
            onOpenResource={(key) => setActiveResource(key)}
            onOpenConsultation={() => handleOpenConsultation('Institutional Trust & Governance')}
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionAnimation}
        >
          <ClosingSection onOpenConsultation={() => handleOpenConsultation('Platform Deployment')} />
        </motion.div>
      </main>

      {/* Footer */}
      <Footer
        onOpenResource={(key) => setActiveResource(key)}
        onOpenConsultation={() => handleOpenConsultation('General Information')}
      />

      {/* Modals */}
      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
        initialTopic={consultationTopic}
      />

      <TrustResourceModal
        resourceKey={activeResource}
        onClose={() => setActiveResource(null)}
      />
    </div>
  );
}
