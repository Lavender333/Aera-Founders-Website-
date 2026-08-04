import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { AeraLogo } from './AeraLogo';
import { ArrowRight, WifiOff, Radio, Activity } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface HeroCinematicProps {
  onExploreClick: () => void;
}

type CrisisMode = 'normal' | 'advisory' | 'blackout' | 'recovery';

interface CrisisScenario {
  id: CrisisMode;
  name: string;
  badge: string;
  badgeColor: string;
  badgeBg: string;
  headline: string;
  desc: string;
  meshStatus: string;
  telemetryMetric: string;
}

const CRISIS_SCENARIOS: Record<CrisisMode, CrisisScenario> = {
  normal: {
    id: 'normal',
    name: 'Routine Preparedness',
    badge: 'NORMAL OPERATIONS',
    badgeColor: 'text-emerald-700 dark:text-emerald-300',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-950 border-emerald-300 dark:border-emerald-800',
    headline: 'Continuous readiness sync across family & hubs.',
    desc: 'Household assets verified. Encrypted digital vaults backed up offline.',
    meshStatus: 'Cellular & Wi-Fi Active • 100% Mesh Health',
    telemetryMetric: '0 Pending Alerts',
  },
  advisory: {
    id: 'advisory',
    name: 'Severe Storm Alert',
    badge: 'ADVISORY DISPATCHED',
    badgeColor: 'text-amber-700 dark:text-amber-300',
    badgeBg: 'bg-amber-100 dark:bg-amber-950 border-amber-300 dark:border-amber-800',
    headline: 'Automated check-ins dispatched to household members.',
    desc: 'Family safety status prompts sent. Local shelter capacities updated.',
    meshStatus: 'Pre-caching Local Maps & Contacts',
    telemetryMetric: '4/4 Family Checked In',
  },
  blackout: {
    id: 'blackout',
    name: 'Grid & Tower Blackout',
    badge: 'OFFLINE MESH MODE ACTIVE',
    badgeColor: 'text-rose-700 dark:text-rose-300',
    badgeBg: 'bg-rose-100 dark:bg-rose-950 border-rose-300 dark:border-rose-800',
    headline: 'Cell towers down. Peer-to-peer Bluetooth mesh routing.',
    desc: 'Emergency messages relay device-to-device through nearby AERA nodes.',
    meshStatus: 'Zero Lost Packets • Local IndexedDB Active',
    telemetryMetric: 'Peer Mesh Online',
  },
  recovery: {
    id: 'recovery',
    name: 'Coordinated Recovery',
    badge: 'LOGISTICS DEPLOYED',
    badgeColor: 'text-blue-700 dark:text-blue-300',
    badgeBg: 'bg-blue-100 dark:bg-blue-950 border-blue-300 dark:border-blue-800',
    headline: 'Real-time shelter bed counts & water distribution.',
    desc: 'Resource requests route directly to regional emergency operation hubs.',
    meshStatus: '4,000 Gal Water Dispatched • 2 Shelters Open',
    telemetryMetric: 'Full Hub Alignment',
  },
};

export const HeroCinematic: React.FC<HeroCinematicProps> = ({ onExploreClick }) => {
  const [activeStage, setActiveStage] = useState<string>('prepare');
  const [crisisMode] = useState<CrisisMode>('advisory');
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const bgGlowY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const leftColY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const rightHudY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const rightHudRotate = useTransform(scrollYProgress, [0, 1], [0, -1.5]);

  const stages = [
    { id: 'prepare', num: '01', name: 'Prepare', desc: 'People, plans, essential needs' },
    { id: 'report', num: '02', name: 'Report', desc: 'Safety, location, urgent needs' },
    { id: 'coordinate', num: '03', name: 'Coordinate', desc: 'Trusted updates and resources' },
    { id: 'recover', num: '04', name: 'Recover', desc: 'Support, logistics, follow-through' },
  ];

  const currentScenario = CRISIS_SCENARIOS[crisisMode];

  return (
    <section ref={heroRef} className="relative bg-white dark:bg-slate-950 pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden transition-colors" id="top">
      <motion.div style={{ y: bgGlowY }} className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-32 w-[400px] h-[400px] rounded-full bg-blue-500/10 dark:bg-blue-500/20 blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <motion.div style={{ y: leftColY }} className="lg:col-span-6 flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#305854] text-white dark:bg-emerald-950 dark:text-emerald-300 border border-[#305854]/30 text-xs font-bold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#8CBB5D] dark:bg-emerald-400 animate-ping shrink-0" />
              AERA PLATFORM
            </div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#F3F8F5] text-[#305854] border border-[#305854]/15 text-xs font-black tracking-wide">
              FOUNDED BY KENNETH BREWER
            </div>
          </div>

          <h1 className="text-balance text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 dark:text-white leading-[1.02] tracking-tight">
            Kenneth Brewer envisioned a better way to respond when
            <span className="text-[#305854] dark:text-emerald-400"> communication breaks down.</span>
          </h1>

          <p className="lead text-slate-700 dark:text-slate-300 max-w-xl text-base sm:text-lg md:text-xl font-medium leading-relaxed">
            His founding insight became AERA—an independent, mobile-first readiness and emergency coordination platform designed to keep households, community hubs, and critical institutions connected through disruption.
          </p>

          <div className="grid grid-cols-3 gap-2.5 my-1">
            <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center">
              <strong className="text-base sm:text-2xl font-black text-[#305854] dark:text-emerald-400 block leading-none">240M+</strong>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-600 dark:text-slate-400 block mt-1 leading-tight">911 Calls Overload Systems / Yr</span>
            </div>
            <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center">
              <strong className="text-base sm:text-2xl font-black text-[#305854] dark:text-emerald-400 block leading-none">72 HRS</strong>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-600 dark:text-slate-400 block mt-1 leading-tight">Critical Window After Disaster</span>
            </div>
            <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center">
              <strong className="text-base sm:text-2xl font-black text-[#305854] dark:text-emerald-400 block leading-none">1 APP</strong>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-600 dark:text-slate-400 block mt-1 leading-tight">Unites Every Org in Community</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a href="#genesis" className="btn btn-primary group text-sm sm:text-base py-3 px-6 shadow-lg shadow-emerald-600/20">
              Discover Kenneth’s Vision
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#platform"
              onClick={onExploreClick}
              className="btn btn-secondary text-sm sm:text-base py-3 px-5"
            >
              Explore AERA Platform
            </a>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#305854] dark:bg-slate-900 text-white border-l-4 border-[#8CBB5D] dark:border-emerald-400 shadow-md">
            <span className="text-[#8CBB5D] dark:text-emerald-400 text-xs font-bold uppercase tracking-wider block mb-1">
              Kenneth Brewer’s Founding Insight
            </span>
            <p className="text-xs sm:text-sm font-semibold leading-relaxed text-white/95 dark:text-slate-200">
              “An emergency creates a second crisis: fragmented information. Alerts say something happened. People still need to know what to do next.”
            </p>
          </div>
        </motion.div>

        <motion.div style={{ y: rightHudY, rotate: rightHudRotate }} className="lg:col-span-6">
          <div className="relative mx-auto max-w-md lg:max-w-none rounded-[32px] border-2 border-[#305854] dark:border-emerald-500/50 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-2xl transition-colors">
            <div className="absolute -top-4 left-6 px-4 py-2 rounded-full bg-[#8CBB5D] text-[#203f3c] text-xs font-black shadow-lg">
              KENNETH BREWER’S VISION IN ACTION
            </div>

            <div className="flex items-center justify-between pb-4 pt-3 border-b border-[rgba(48,88,84,0.15)] dark:border-slate-800">
              <div className="flex items-center gap-3">
                <AeraLogo size={32} />
                <div>
                  <strong className="text-[#305854] dark:text-emerald-400 text-sm block leading-none font-extrabold">AERA Tactical HUD</strong>
                  <span className="text-xs text-neutral-500 dark:text-slate-400">Shared Operating Picture</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold border ${currentScenario.badgeBg} ${currentScenario.badgeColor}`}>
                {currentScenario.badge}
              </span>
            </div>

            <div className="mt-4 p-3.5 rounded-xl bg-slate-900 text-white dark:bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                  <Activity className="w-3 h-3 text-emerald-400" />
                  Live Operational Telemetry
                </span>
                <span className="text-[10px] font-mono text-slate-400">{currentScenario.telemetryMetric}</span>
              </div>
              <p className="text-xs font-bold text-slate-100">{currentScenario.headline}</p>
              <p className="text-[11px] text-slate-400 leading-tight">{currentScenario.desc}</p>
            </div>

            <div className="py-5 flex flex-col gap-4">
              <div>
                <span className="text-xs font-bold text-[#467857] dark:text-emerald-400 uppercase tracking-wider">
                  One Unified Operating View
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  People, needs, and next steps — aligned.
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {stages.map((stage) => (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      setActiveStage(stage.id);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      activeStage === stage.id
                        ? 'bg-[#F3F8F5] dark:bg-slate-800 border-[#305854] dark:border-emerald-500 ring-2 ring-[#8CBB5D]/50 dark:ring-emerald-500/50 shadow-sm'
                        : 'bg-white dark:bg-slate-900 border-neutral-200 dark:border-slate-800 hover:border-[#467857]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-extrabold text-[#305854] dark:text-emerald-400">{stage.num}</span>
                      {activeStage === stage.id && <span className="w-2 h-2 rounded-full bg-[#8CBB5D] dark:bg-emerald-400" />}
                    </div>
                    <strong className="text-sm block text-slate-900 dark:text-white font-bold">{stage.name}</strong>
                    <span className="text-[11px] text-neutral-600 dark:text-slate-400 block leading-tight mt-0.5">{stage.desc}</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#305854] dark:bg-slate-950 text-white border border-emerald-500/30">
                {crisisMode === 'blackout' ? (
                  <WifiOff className="text-rose-400 shrink-0" size={20} />
                ) : (
                  <Radio className="text-emerald-400 shrink-0 animate-pulse" size={20} />
                )}
                <div className="flex-1 text-xs">
                  <strong className="text-white block font-bold">Mesh Routing Status</strong>
                  <span className="text-emerald-300 dark:text-emerald-400 font-mono text-[11px]">{currentScenario.meshStatus}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
