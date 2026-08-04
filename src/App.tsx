import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Header } from './components/Header';
import { HeroCinematic } from './components/HeroCinematic';
import { GenesisStory } from './components/GenesisStory';
import { MissionLegacy } from './components/MissionLegacy';
import { FoundersSection } from './components/FoundersSection';
import { PresentationCallout } from './components/PresentationCallout';
import { PresentationModal } from './components/PresentationModal';
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
  const [presentationOpen, setPresentationOpen] = useState<boolean>(false);

  const [consultationOpen, setConsultationOpen] = useState<boolean>(false);
  const [consultationTopic, setConsultationTopic] = useState<string>('');
  const [activeResource, setActiveResource] = useState<TrustResourceKey | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const totalHeight = doc.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollPercent(Math.min(100, Math.max(0, progress)));

      const sections = [
        'top',
        'genesis',
        'legacy',
        'founders',
        'presentation',
        'app-simulator',
        'platform',
        'enterprise',
        'trust',
      ];
      const marker = window.innerHeight * 0.4;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= marker && rect.bottom >= 0) {
            setCurrentSection(section);
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

  const openPresentation = () => {
    setShowSplash(false);
    setPresentationOpen(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-black selection:bg-[#8CBB5D] selection:text-[#305854]">
      <a
        href="#main-content"
        className="sr-only z-[130] rounded-full bg-[#305854] px-4 py-2 text-xs font-bold text-white focus:fixed focus:left-4 focus:top-4 focus:not-sr-only"
      >
        Skip to main content
      </a>

      <AnimatePresence>
        {showSplash && (
          <SplashScreen
            onDismiss={() => setShowSplash(false)}
            registeredCount={14}
          />
        )}
      </AnimatePresence>

      <Header
        onOpenConsultation={handleOpenConsultation}
        onOpenPresentation={openPresentation}
        onOpenSplash={() => setShowSplash(true)}
        scrollPercent={scrollPercent}
        currentSection={currentSection}
      />

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
          viewport={{ once: true, amount: 0.06 }}
          variants={sectionAnimation}
        >
          <MissionLegacy />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionAnimation}
        >
          <FoundersSection />
        </motion.div>

        <PresentationCallout onOpenPresentation={openPresentation} />

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

      <Footer
        onOpenResource={(key) => setActiveResource(key)}
        onOpenConsultation={() => handleOpenConsultation('General Information')}
        onOpenPresentation={openPresentation}
      />

      <PresentationModal
        isOpen={presentationOpen}
        onClose={() => setPresentationOpen(false)}
        onOpenConsultation={() => handleOpenConsultation('Executive Presentation Follow-Up')}
      />

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
