import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Boxes,
  Building2,
  CheckCircle2,
  Compass,
  ExternalLink,
  Gift,
  HeartHandshake,
  Network,
  ShieldCheck,
  X,
} from 'lucide-react';
import { podModelImage } from '../assets/podModelImage';

interface AeraPresentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Slide = {
  id: string;
  eyebrow: string;
  title: string;
  body?: string;
};

export const AeraPresentationModal: React.FC<AeraPresentationModalProps> = ({ isOpen, onClose }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = useMemo<Slide[]>(
    () => [
      {
        id: 'vision',
        eyebrow: 'Founded by Kenneth Brewer',
        title: 'Kenneth Brewer envisioned a better way to respond when communication breaks down.',
        body: 'His founding insight became AERA—an independent, mobile-first readiness and emergency coordination platform designed to keep households, community hubs, and critical institutions connected through disruption.',
      },
      {
        id: 'pod-model',
        eyebrow: 'Connected Response Infrastructure',
        title: 'The AERA POD Model',
        body: 'AERA connects household demand, warehouse logistics, main-hub oversight, and local POD-site fulfillment through one shared operating picture.',
      },
      {
        id: 'legacy',
        eyebrow: 'Mission & Field Legacy',
        title: 'Before AERA was software, the mission was already moving.',
        body: 'Field experience, long-term study, family-centered relief, and community engagement shaped the operating principles now carried into the platform.',
      },
      {
        id: 'platform',
        eyebrow: 'The Vision in Action',
        title: 'Prepare. Report. Coordinate. Recover.',
        body: 'AERA gives households, organizations, and institutional leaders a clearer path from readiness through verified recovery and follow-through.',
      },
    ],
    [],
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') setActiveSlide((current) => (current + 1) % slides.length);
      if (event.key === 'ArrowLeft') setActiveSlide((current) => (current - 1 + slides.length) % slides.length);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, slides.length]);

  useEffect(() => {
    if (isOpen) setActiveSlide(0);
  }, [isOpen]);

  const nextSlide = () => setActiveSlide((current) => (current + 1) % slides.length);
  const previousSlide = () => setActiveSlide((current) => (current - 1 + slides.length) % slides.length);
  const current = slides[activeSlide];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[240] flex items-center justify-center bg-[#081D1B]/95 p-3 backdrop-blur-xl sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="aera-presentation-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 18 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-[30px] border border-white/10 bg-[#F4F2EC] shadow-[0_36px_120px_rgba(0,0,0,0.5)]"
          >
            <header className="flex items-center justify-between border-b border-[#305854]/12 bg-white/90 px-4 py-3 backdrop-blur-md sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#305854] text-sm font-black text-white">A</div>
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#467857]">Executive Presentation</span>
                  <strong className="block text-sm font-black text-[#16233B]">AERA · Accelerated Emergency Response Application</strong>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#305854]/15 bg-white text-[#305854] transition-colors hover:bg-[#EAF4E7]"
                aria-label="Close presentation"
              >
                <X size={20} />
              </button>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.section
                  key={current.id}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.3 }}
                  className="min-h-[620px] p-5 sm:p-8 lg:p-10"
                >
                  {current.id === 'vision' && (
                    <div className="grid min-h-[540px] grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
                      <div className="lg:col-span-7">
                        <span className="inline-flex rounded-full bg-[#305854] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white">
                          {current.eyebrow}
                        </span>
                        <h1 id="aera-presentation-title" className="mt-6 text-4xl font-black leading-[1.02] text-[#16233B] sm:text-6xl">
                          {current.title}
                        </h1>
                        <p className="mt-6 max-w-3xl text-base font-medium leading-relaxed text-slate-700 sm:text-xl">{current.body}</p>
                        <blockquote className="mt-8 rounded-[24px] border-l-4 border-[#8CBB5D] bg-[#305854] p-6 text-lg font-black italic leading-relaxed text-white shadow-xl sm:text-2xl">
                          “How can people stay prepared, connected, and coordinated when communication fails?”
                        </blockquote>
                      </div>
                      <div className="lg:col-span-5">
                        <div className="rounded-[32px] bg-[#305854] p-7 text-white shadow-2xl">
                          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#B9E58B]">Kenneth Brewer’s Founding Vision</span>
                          <div className="mt-6 grid grid-cols-2 gap-3">
                            {['Prepare', 'Report', 'Coordinate', 'Recover'].map((step, index) => (
                              <div key={step} className="rounded-2xl border border-white/12 bg-white/8 p-4">
                                <span className="text-xs font-black text-[#B9E58B]">0{index + 1}</span>
                                <strong className="mt-2 block text-base">{step}</strong>
                              </div>
                            ))}
                          </div>
                          <div className="mt-6 flex h-28 items-center justify-center rounded-3xl bg-white text-5xl font-black text-[#305854]">KB</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {current.id === 'pod-model' && (
                    <div>
                      <div className="mx-auto max-w-4xl text-center">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-[#467857]">{current.eyebrow}</span>
                        <h2 className="mt-3 text-3xl font-black text-[#16233B] sm:text-5xl">{current.title}</h2>
                        <p className="mx-auto mt-4 max-w-3xl text-base font-medium leading-relaxed text-slate-600 sm:text-lg">{current.body}</p>
                      </div>
                      <div className="mx-auto mt-7 max-w-4xl overflow-hidden rounded-[28px] border border-[#305854]/15 bg-white p-3 shadow-2xl">
                        <img
                          src={podModelImage}
                          alt="AERA POD Model connecting the AERA platform, warehouse logistics, main church hub oversight, and local church campus POD sites."
                          className="h-auto w-full rounded-[20px]"
                        />
                      </div>
                    </div>
                  )}

                  {current.id === 'legacy' && (
                    <div className="flex min-h-[540px] flex-col justify-center">
                      <div className="max-w-4xl">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-[#467857]">{current.eyebrow}</span>
                        <h2 className="mt-4 text-4xl font-black leading-tight text-[#16233B] sm:text-6xl">{current.title}</h2>
                        <p className="mt-5 text-base font-medium leading-relaxed text-slate-700 sm:text-xl">{current.body}</p>
                      </div>
                      <div className="mt-9 grid grid-cols-1 gap-4 md:grid-cols-3">
                        {[
                          { icon: Gift, title: 'G.I.F.T.', text: 'Family-centered recovery and practical support for impacted children and households.' },
                          { icon: HeartHandshake, title: 'Three Kings Day', text: 'Community presence rooted in culture, dignity, listening, and direct connection.' },
                          { icon: Boxes, title: 'Pallets of Pride', text: 'Recovery infrastructure that turns damaged logistics assets into community value.' },
                        ].map((item) => {
                          const Icon = item.icon;
                          return (
                            <article key={item.title} className="rounded-[26px] border border-[#305854]/12 bg-white p-6 shadow-sm">
                              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF4E7] text-[#305854]">
                                <Icon size={24} />
                              </div>
                              <h3 className="mt-5 text-xl font-black text-[#16233B]">{item.title}</h3>
                              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600">{item.text}</p>
                            </article>
                          );
                        })}
                      </div>
                      <div className="mt-6 flex items-start gap-3 rounded-[22px] bg-[#305854] p-5 text-white">
                        <ShieldCheck className="mt-0.5 shrink-0 text-[#B9E58B]" size={24} />
                        <p className="font-black">Recovery should be done with communities—not merely delivered to them.</p>
                      </div>
                    </div>
                  )}

                  {current.id === 'platform' && (
                    <div className="flex min-h-[540px] flex-col justify-center">
                      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
                        <div className="lg:col-span-6">
                          <span className="text-xs font-black uppercase tracking-[0.2em] text-[#467857]">{current.eyebrow}</span>
                          <h2 className="mt-4 text-4xl font-black leading-tight text-[#16233B] sm:text-6xl">{current.title}</h2>
                          <p className="mt-5 text-base font-medium leading-relaxed text-slate-700 sm:text-xl">{current.body}</p>
                          <a
                            href="https://getaeraapp.com/"
                            target="_blank"
                            rel="noreferrer"
                            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-[#305854] px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-white shadow-lg transition-transform hover:-translate-y-0.5"
                          >
                            Open AERA Demo <ExternalLink size={18} />
                          </a>
                        </div>
                        <div className="lg:col-span-6">
                          <div className="rounded-[32px] bg-[#305854] p-6 text-white shadow-2xl sm:p-8">
                            <div className="grid grid-cols-2 gap-4">
                              {[
                                { icon: Compass, title: 'Prepare', text: 'People, plans, essential needs' },
                                { icon: CheckCircle2, title: 'Report', text: 'Safety, location, urgent needs' },
                                { icon: Network, title: 'Coordinate', text: 'Trusted updates and resources' },
                                { icon: Building2, title: 'Recover', text: 'Support, logistics, follow-through' },
                              ].map((item, index) => {
                                const Icon = item.icon;
                                return (
                                  <div key={item.title} className="rounded-2xl border border-white/12 bg-white/8 p-4">
                                    <div className="flex items-center justify-between">
                                      <Icon className="text-[#B9E58B]" size={22} />
                                      <span className="text-xs font-black text-[#B9E58B]">0{index + 1}</span>
                                    </div>
                                    <strong className="mt-4 block text-lg">{item.title}</strong>
                                    <span className="mt-1 block text-xs leading-relaxed text-white/70">{item.text}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.section>
              </AnimatePresence>
            </div>

            <footer className="flex flex-col gap-4 border-t border-[#305854]/12 bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="flex items-center gap-2">
                {slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    className={`h-2.5 rounded-full transition-all ${activeSlide === index ? 'w-9 bg-[#305854]' : 'w-2.5 bg-[#305854]/20 hover:bg-[#305854]/40'}`}
                    aria-label={`Go to presentation slide ${index + 1}`}
                  />
                ))}
                <span className="ml-3 text-xs font-black uppercase tracking-[0.14em] text-slate-500">{activeSlide + 1} / {slides.length}</span>
              </div>
              <div className="flex items-center gap-3">
                <button type="button" onClick={previousSlide} className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[#305854]/15 bg-white px-4 py-2 text-sm font-black text-[#305854] hover:bg-[#EAF4E7]">
                  <ArrowLeft size={18} /> Previous
                </button>
                <button type="button" onClick={nextSlide} className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#305854] px-5 py-2 text-sm font-black text-white hover:bg-[#234542]">
                  Next <ArrowRight size={18} />
                </button>
              </div>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
