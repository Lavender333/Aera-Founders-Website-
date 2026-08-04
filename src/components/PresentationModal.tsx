import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Boxes,
  Building2,
  CheckCircle2,
  Clock3,
  Compass,
  Gift,
  HeartHandshake,
  Layers3,
  Network,
  PackageCheck,
  Pause,
  Play,
  Radio,
  RefreshCw,
  ShieldCheck,
  Users,
  X,
} from 'lucide-react';
import { AeraLogo } from './AeraLogo';
import { giftLegacyImage } from '../assets/giftLegacyImage';
import { threeKingsLegacyImage } from '../assets/threeKingsLegacyImage';
import { palletsLegacyImage } from '../assets/palletsLegacyImage';

interface PresentationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConsultation: () => void;
}

interface PresentationSlide {
  eyebrow: string;
  title: string;
  lead: string;
  bullets?: string[];
  quote?: string;
}

const PRESENTATION_DURATION_SECONDS = 12 * 60;

const slides: PresentationSlide[] = [
  {
    eyebrow: 'Kenneth Brewer’s Founding Vision',
    title: 'A better way to respond when communication breaks down.',
    lead:
      'Kenneth Brewer envisioned an independent, mobile-first readiness and emergency coordination platform designed to keep households, community hubs, and critical institutions connected through disruption.',
    quote:
      'How can people stay prepared, connected, and coordinated when communication fails?',
  },
  {
    eyebrow: 'The Problem After the Alert',
    title: 'Information can exist everywhere and still leave people without a dependable path forward.',
    lead:
      'Calls, texts, locations, needs, inventory, and operational updates are often scattered across disconnected channels precisely when clarity matters most.',
    bullets: [
      'Families cannot confirm safety or urgent needs through one shared process.',
      'Organizations act without one current view of people, resources, and assignments.',
      'Leaders lose time reconciling fragmented reports instead of coordinating action.',
    ],
  },
  {
    eyebrow: 'Mission & Field Legacy',
    title: 'Before AERA was software, the mission was already moving.',
    lead:
      'Hurricane Katrina, family-centered recovery work, direct neighborhood engagement in Puerto Rico, and recovery-infrastructure concepts shaped a model grounded in dignity, coordination, and follow-through.',
    bullets: [
      'G.I.F.T. supported more than 20,000 impacted children.',
      'Three Kings Day Puerto Rico centered culture, listening, and direct connection.',
      'Pallets of Pride explored practical reuse, safer storage, and local opportunity.',
    ],
  },
  {
    eyebrow: 'The AERA Operating Model',
    title: 'One connected path from preparedness through recovery.',
    lead:
      'AERA turns fragmented emergency activity into a repeatable operating model that people and organizations can understand before disruption occurs.',
    bullets: [
      'Prepare people, plans, essential needs, and local capacity.',
      'Report safety, location, urgent needs, and changing conditions.',
      'Coordinate trusted updates, assignments, resources, and accountability.',
      'Recover with verified fulfillment, continuity, and follow-through.',
    ],
  },
  {
    eyebrow: 'One Shared Operating Picture',
    title: 'Who is safe. What is needed. Who is responsible. What happens next.',
    lead:
      'The platform connects household status, community requests, organizational workflows, inventory, distribution, and fulfillment reporting in one coordinated experience.',
    bullets: [
      'Mobile-first access designed for use under pressure.',
      'Role-based visibility across households, local organizations, hubs, and networks.',
      'Offline-aware workflows that preserve critical activity through disruption.',
    ],
  },
  {
    eyebrow: 'Community-to-Institution Continuity',
    title: 'AERA connects the people closest to the need with the organizations positioned to respond.',
    lead:
      'The Pod–Hub model creates a logical line of coordination from individual households to local organizations, community hubs, logistics capacity, and regional visibility.',
    bullets: [
      'Households communicate status and needs.',
      'Local organizations coordinate membership, volunteers, and support.',
      'Community and logistics hubs manage resources and fulfillment.',
      'Institutional leaders gain a clearer operational picture.',
    ],
  },
  {
    eyebrow: 'Founder Leadership',
    title: 'One founding vision. A platform built to make it real.',
    lead:
      'Kenneth Brewer originated AERA’s founding insight and response model. Antoinette Williams transformed that vision into product architecture and working technology.',
    bullets: [
      'Kenneth Brewer leads the mission, partnerships, strategy, and institutional growth.',
      'Antoinette Williams leads product architecture, workflows, user experience, and platform engineering.',
      'Together, the leadership model connects purpose with disciplined execution.',
    ],
  },
  {
    eyebrow: 'The Next Conversation',
    title: 'Move from fragmented response toward coordinated readiness.',
    lead:
      'AERA is designed to support structured conversations about pilot design, community readiness, organizational workflows, and responsible institutional deployment.',
    bullets: [
      'Define the people, organizations, and geography involved.',
      'Validate enrollment, coordination, inventory, and fulfillment workflows.',
      'Measure what improves before considering broader expansion.',
    ],
  },
];

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${minutes}:${remainder.toString().padStart(2, '0')}`;
};

export const PresentationModal: React.FC<PresentationModalProps> = ({
  isOpen,
  onClose,
  onOpenConsultation,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(PRESENTATION_DURATION_SECONDS);
  const [isRunning, setIsRunning] = useState(true);

  const current = slides[activeSlide];
  const progress = ((activeSlide + 1) / slides.length) * 100;

  const slideLabel = useMemo(
    () => `${String(activeSlide + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`,
    [activeSlide],
  );

  useEffect(() => {
    if (!isOpen) return;

    setActiveSlide(0);
    setRemainingSeconds(PRESENTATION_DURATION_SECONDS);
    setIsRunning(true);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !isRunning || remainingSeconds <= 0) return;

    const timer = window.setInterval(() => {
      setRemainingSeconds((seconds) => {
        if (seconds <= 1) {
          setIsRunning(false);
          return 0;
        }
        return seconds - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isOpen, isRunning, remainingSeconds]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') {
        setActiveSlide((slide) => Math.min(slides.length - 1, slide + 1));
      }
      if (event.key === 'ArrowLeft') {
        setActiveSlide((slide) => Math.max(0, slide - 1));
      }
      if (event.key === ' ') {
        event.preventDefault();
        setIsRunning((running) => !running);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const previousSlide = () => setActiveSlide((slide) => Math.max(0, slide - 1));
  const nextSlide = () => setActiveSlide((slide) => Math.min(slides.length - 1, slide + 1));

  const restartPresentation = () => {
    setActiveSlide(0);
    setRemainingSeconds(PRESENTATION_DURATION_SECONDS);
    setIsRunning(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[240] bg-[#071C1A]/95 p-0 sm:p-4 lg:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="AERA executive presentation"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.985, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.985, y: 12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto flex h-full max-w-[1600px] flex-col overflow-hidden bg-[#F4F2EC] shadow-2xl sm:rounded-[30px] sm:border sm:border-white/15"
          >
            <div className="h-1.5 bg-[#173D38]/10">
              <motion.div
                className="h-full bg-[#8CBB5D]"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.35 }}
              />
            </div>

            <header className="flex items-center justify-between gap-4 border-b border-[#305854]/15 bg-white/90 px-4 py-3 backdrop-blur-md sm:px-6 lg:px-8">
              <div className="flex min-w-0 items-center gap-3">
                <AeraLogo size={38} />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <strong className="text-sm font-black tracking-[0.18em] text-[#173D38]">AERA</strong>
                    <span className="hidden rounded-full bg-[#EAF4E7] px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.16em] text-[#305854] sm:inline-flex">
                      Executive Presentation
                    </span>
                  </div>
                  <span className="block truncate text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-500">
                    Kenneth Brewer’s founding vision in action
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="hidden items-center gap-2 rounded-full border border-[#305854]/15 bg-[#F3F8F5] px-3 py-2 sm:flex">
                  <Clock3 size={15} className="text-[#305854]" />
                  <span className="font-mono text-xs font-black text-[#173D38]">
                    {formatTime(remainingSeconds)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsRunning((running) => !running)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#305854]/15 bg-white text-[#305854] transition-colors hover:bg-[#F3F8F5]"
                  aria-label={isRunning ? 'Pause presentation timer' : 'Resume presentation timer'}
                >
                  {isRunning ? <Pause size={17} /> : <Play size={17} />}
                </button>
                <button
                  type="button"
                  onClick={restartPresentation}
                  className="hidden h-10 w-10 items-center justify-center rounded-full border border-[#305854]/15 bg-white text-[#305854] transition-colors hover:bg-[#F3F8F5] sm:flex"
                  aria-label="Restart presentation"
                >
                  <RefreshCw size={17} />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#173D38] text-white transition-transform hover:scale-105"
                  aria-label="Close presentation"
                >
                  <X size={19} />
                </button>
              </div>
            </header>

            <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)]">
              <aside className="hidden border-r border-[#305854]/15 bg-[#102E2A] p-5 text-white lg:flex lg:flex-col">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#B9E58B]">
                  Presentation Path
                </span>
                <div className="mt-5 flex flex-1 flex-col gap-2">
                  {slides.map((slide, index) => (
                    <button
                      key={slide.eyebrow}
                      type="button"
                      onClick={() => setActiveSlide(index)}
                      className={`group flex items-start gap-3 rounded-2xl px-3 py-3 text-left transition-all ${
                        activeSlide === index
                          ? 'bg-white text-[#173D38] shadow-lg'
                          : 'text-white/65 hover:bg-white/8 hover:text-white'
                      }`}
                    >
                      <span
                        className={`mt-0.5 font-mono text-[10px] font-black ${
                          activeSlide === index ? 'text-[#467857]' : 'text-[#B9E58B]'
                        }`}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-xs font-bold leading-snug">{slide.eyebrow}</span>
                    </button>
                  ))}
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="block text-[9px] font-black uppercase tracking-[0.18em] text-[#B9E58B]">
                    Keyboard
                  </span>
                  <p className="mt-2 text-[11px] leading-relaxed text-white/60">
                    Use ← → to move, space to pause, and Esc to close.
                  </p>
                </div>
              </aside>

              <main className="min-h-0 overflow-y-auto">
                <AnimatePresence mode="wait">
                  <motion.section
                    key={activeSlide}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -18 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="flex min-h-full flex-col px-5 py-6 sm:px-8 sm:py-9 lg:px-12 xl:px-16"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="inline-flex rounded-full border border-[#305854]/15 bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#305854] shadow-sm">
                        {current.eyebrow}
                      </span>
                      <span className="font-mono text-xs font-black text-[#467857]">{slideLabel}</span>
                    </div>

                    <div className="mt-6 grid flex-1 grid-cols-1 gap-8 xl:grid-cols-12 xl:items-center">
                      <div className="xl:col-span-6">
                        <h2 className="max-w-4xl font-serif text-4xl font-bold leading-[1.02] tracking-tight text-[#16233B] sm:text-5xl lg:text-6xl xl:text-7xl">
                          {current.title}
                        </h2>
                        <p className="mt-6 max-w-3xl text-base font-medium leading-relaxed text-neutral-700 sm:text-lg lg:text-xl">
                          {current.lead}
                        </p>

                        {current.quote && (
                          <blockquote className="mt-7 rounded-[24px] border-l-4 border-[#8CBB5D] bg-[#305854] p-5 text-lg font-black italic leading-relaxed text-white shadow-xl sm:p-6 sm:text-xl">
                            “{current.quote}”
                          </blockquote>
                        )}

                        {current.bullets && (
                          <div className="mt-7 grid gap-3">
                            {current.bullets.map((bullet) => (
                              <div
                                key={bullet}
                                className="flex items-start gap-3 rounded-2xl border border-[#305854]/12 bg-white/85 p-4 shadow-sm"
                              >
                                <CheckCircle2 className="mt-0.5 shrink-0 text-[#467857]" size={20} />
                                <span className="text-sm font-semibold leading-relaxed text-neutral-800 sm:text-base">
                                  {bullet}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="xl:col-span-6">
                        {activeSlide === 0 && (
                          <div className="relative overflow-hidden rounded-[34px] bg-[#173D38] p-7 text-white shadow-2xl sm:p-9">
                            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#8CBB5D]/20 blur-3xl" />
                            <div className="relative z-10">
                              <div className="flex items-center justify-between">
                                <div className="flex h-28 w-28 items-center justify-center rounded-[28px] bg-white text-4xl font-black text-[#305854] shadow-xl sm:h-36 sm:w-36 sm:text-5xl">
                                  KB
                                </div>
                                <Compass size={54} className="text-[#B9E58B]" />
                              </div>
                              <span className="mt-8 block text-[11px] font-black uppercase tracking-[0.2em] text-[#B9E58B]">
                                Founder · Visionary · Chief Executive
                              </span>
                              <h3 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">
                                The driving vision behind AERA.
                              </h3>
                              <p className="mt-4 max-w-xl text-sm font-medium leading-relaxed text-white/75 sm:text-base">
                                Kenneth Brewer identified the missing link between emergency awareness and coordinated action.
                              </p>
                            </div>
                          </div>
                        )}

                        {activeSlide === 1 && (
                          <div className="rounded-[34px] border border-[#305854]/15 bg-white p-6 shadow-2xl sm:p-8">
                            <div className="grid gap-3">
                              {[
                                ['Scattered updates', 'No shared status'],
                                ['Unknown needs', 'Delayed prioritization'],
                                ['Disconnected response', 'Duplicated effort'],
                              ].map(([title, status]) => (
                                <div key={title} className="flex items-center justify-between gap-4 rounded-2xl bg-[#F4F2EC] p-4">
                                  <div className="flex items-center gap-3">
                                    <Radio size={21} className="text-[#467857]" />
                                    <strong className="text-sm text-[#16233B] sm:text-base">{title}</strong>
                                  </div>
                                  <span className="rounded-full bg-rose-100 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-rose-700">
                                    {status}
                                  </span>
                                </div>
                              ))}
                            </div>
                            <div className="mt-4 rounded-2xl bg-[#305854] p-5 text-center text-white">
                              <strong className="text-xl">AERA closes the coordination gap.</strong>
                            </div>
                          </div>
                        )}

                        {activeSlide === 2 && (
                          <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            <figure className="col-span-2 overflow-hidden rounded-[28px] bg-white shadow-xl">
                              <img src={giftLegacyImage} alt="G.I.F.T. disaster recovery initiative archival material" className="h-44 w-full object-cover object-top sm:h-56" />
                              <figcaption className="flex items-center gap-2 p-4 text-sm font-black text-[#305854]">
                                <Gift size={19} /> G.I.F.T. · 20,000+ impacted children
                              </figcaption>
                            </figure>
                            <figure className="overflow-hidden rounded-[24px] bg-white shadow-xl">
                              <img src={threeKingsLegacyImage} alt="Three Kings Day Puerto Rico community engagement" className="h-36 w-full object-cover sm:h-44" />
                              <figcaption className="flex items-center gap-2 p-3 text-xs font-black text-[#305854]">
                                <HeartHandshake size={17} /> Puerto Rico
                              </figcaption>
                            </figure>
                            <figure className="overflow-hidden rounded-[24px] bg-white shadow-xl">
                              <img src={palletsLegacyImage} alt="Pallets of Pride recovery infrastructure initiative" className="h-36 w-full object-cover object-top sm:h-44" />
                              <figcaption className="flex items-center gap-2 p-3 text-xs font-black text-[#305854]">
                                <PackageCheck size={17} /> Pallets of Pride
                              </figcaption>
                            </figure>
                          </div>
                        )}

                        {activeSlide === 3 && (
                          <div className="grid grid-cols-2 gap-4">
                            {[
                              ['01', 'Prepare', Users],
                              ['02', 'Report', Radio],
                              ['03', 'Coordinate', Network],
                              ['04', 'Recover', PackageCheck],
                            ].map(([number, label, Icon]) => {
                              const StageIcon = Icon as React.ComponentType<{ size?: number; className?: string }>;
                              return (
                                <div key={String(number)} className="rounded-[26px] border border-[#305854]/15 bg-white p-5 shadow-lg sm:p-6">
                                  <div className="flex items-center justify-between">
                                    <span className="font-mono text-sm font-black text-[#467857]">{number}</span>
                                    <StageIcon size={25} className="text-[#305854]" />
                                  </div>
                                  <strong className="mt-7 block text-xl text-[#16233B] sm:text-2xl">{String(label)}</strong>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {activeSlide === 4 && (
                          <div className="rounded-[34px] bg-[#173D38] p-6 text-white shadow-2xl sm:p-8">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#B9E58B]">AERA Shared View</span>
                            <div className="mt-5 grid grid-cols-2 gap-3">
                              {[
                                ['People', Users],
                                ['Needs', ShieldCheck],
                                ['Resources', Boxes],
                                ['Next Steps', ArrowRight],
                              ].map(([label, Icon]) => {
                                const ViewIcon = Icon as React.ComponentType<{ size?: number; className?: string }>;
                                return (
                                  <div key={String(label)} className="rounded-2xl border border-white/10 bg-white/7 p-5">
                                    <ViewIcon size={25} className="text-[#B9E58B]" />
                                    <strong className="mt-4 block text-base sm:text-lg">{String(label)}</strong>
                                  </div>
                                );
                              })}
                            </div>
                            <p className="mt-5 text-sm font-semibold leading-relaxed text-white/70">
                              One current picture replaces disconnected fragments with coordinated responsibility.
                            </p>
                          </div>
                        )}

                        {activeSlide === 5 && (
                          <div className="rounded-[34px] border border-[#305854]/15 bg-white p-6 shadow-2xl sm:p-8">
                            <div className="space-y-3">
                              {[
                                ['Household', 'Safety status and urgent needs', Users],
                                ['Local Organization', 'Membership and coordinated support', HeartHandshake],
                                ['Community Hub', 'Requests, resources, and assignments', Building2],
                                ['Network', 'Regional visibility and continuity', Network],
                              ].map(([title, description, Icon], index) => {
                                const FlowIcon = Icon as React.ComponentType<{ size?: number; className?: string }>;
                                return (
                                  <div key={String(title)}>
                                    <div className="flex items-center gap-4 rounded-2xl bg-[#F3F8F5] p-4">
                                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#305854] text-white">
                                        <FlowIcon size={21} />
                                      </div>
                                      <div>
                                        <strong className="block text-sm text-[#16233B] sm:text-base">{String(title)}</strong>
                                        <span className="text-xs font-medium text-neutral-600 sm:text-sm">{String(description)}</span>
                                      </div>
                                    </div>
                                    {index < 3 && <div className="mx-auto h-3 w-px bg-[#8CBB5D]" />}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {activeSlide === 6 && (
                          <div className="grid gap-4 sm:grid-cols-5">
                            <div className="rounded-[30px] bg-[#305854] p-6 text-white shadow-2xl sm:col-span-3">
                              <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white text-3xl font-black text-[#305854]">KB</div>
                              <span className="mt-5 block text-[10px] font-black uppercase tracking-[0.18em] text-[#B9E58B]">Founder & Visionary</span>
                              <h3 className="mt-2 text-3xl font-black">Kenneth Brewer</h3>
                              <p className="mt-3 text-sm leading-relaxed text-white/75">Mission, strategy, partnerships, and institutional growth.</p>
                            </div>
                            <div className="rounded-[30px] border border-[#305854]/15 bg-white p-6 shadow-xl sm:col-span-2">
                              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#467857] text-2xl font-black text-white">AW</div>
                              <span className="mt-5 block text-[10px] font-black uppercase tracking-[0.18em] text-[#467857]">Platform Leadership</span>
                              <h3 className="mt-2 text-xl font-black text-[#16233B]">Antoinette Williams</h3>
                              <p className="mt-3 text-sm leading-relaxed text-neutral-600">Architecture, workflows, user experience, and engineering.</p>
                            </div>
                          </div>
                        )}

                        {activeSlide === 7 && (
                          <div className="relative overflow-hidden rounded-[34px] bg-[#8CBB5D] p-7 text-[#173D38] shadow-2xl sm:p-10">
                            <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/30 blur-3xl" />
                            <div className="relative z-10">
                              <Layers3 size={48} />
                              <span className="mt-7 block text-[10px] font-black uppercase tracking-[0.2em]">Structured Pilot Design</span>
                              <h3 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">Start with clarity. Validate the model. Expand responsibly.</h3>
                              <button
                                type="button"
                                onClick={() => {
                                  onClose();
                                  onOpenConsultation();
                                }}
                                className="mt-7 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#173D38] px-6 py-3 text-sm font-black text-white shadow-lg transition-transform hover:-translate-y-0.5"
                              >
                                Discuss AERA
                                <ArrowRight size={18} />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-8 flex flex-col gap-4 border-t border-[#305854]/15 pt-5 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                        {slides.map((slide, index) => (
                          <button
                            key={slide.eyebrow}
                            type="button"
                            onClick={() => setActiveSlide(index)}
                            className={`h-2.5 shrink-0 rounded-full transition-all ${
                              activeSlide === index ? 'w-9 bg-[#305854]' : 'w-2.5 bg-[#305854]/20 hover:bg-[#305854]/40'
                            }`}
                            aria-label={`Go to presentation slide ${index + 1}`}
                          />
                        ))}
                      </div>

                      <div className="flex items-center justify-between gap-3 sm:justify-end">
                        <div className="flex items-center gap-2 rounded-full border border-[#305854]/15 bg-white px-3 py-2 sm:hidden">
                          <Clock3 size={14} className="text-[#305854]" />
                          <span className="font-mono text-xs font-black text-[#173D38]">{formatTime(remainingSeconds)}</span>
                        </div>
                        <button
                          type="button"
                          onClick={previousSlide}
                          disabled={activeSlide === 0}
                          className="flex h-11 items-center gap-2 rounded-full border border-[#305854]/20 bg-white px-4 text-xs font-black text-[#305854] transition-colors hover:bg-[#F3F8F5] disabled:cursor-not-allowed disabled:opacity-35"
                        >
                          <ArrowLeft size={17} /> Previous
                        </button>
                        <button
                          type="button"
                          onClick={nextSlide}
                          disabled={activeSlide === slides.length - 1}
                          className="flex h-11 items-center gap-2 rounded-full bg-[#305854] px-5 text-xs font-black text-white shadow-lg transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-35"
                        >
                          Next <ArrowRight size={17} />
                        </button>
                      </div>
                    </div>
                  </motion.section>
                </AnimatePresence>
              </main>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
