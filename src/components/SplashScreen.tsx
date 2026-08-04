import React from 'react';
import { motion } from 'motion/react';
import { X, ArrowRight, Shield, Radio, Users, WifiOff, AlertTriangle } from 'lucide-react';
import { AeraLogo } from './AeraLogo';

interface SplashScreenProps {
  onDismiss: () => void;
  registeredCount?: number;
}

const STATS = [
  { stat: "240M+", label: "911 Calls Overload Systems / Yr", icon: Radio, sub: "Avoid System Crash" },
  { stat: "72 HRS", label: "Critical Window After Disaster", icon: Shield, sub: "Rapid Triage & Aid" },
  { stat: "1 APP", label: "Unites Every Org in Community", icon: Users, sub: "Bridge Info Silos" },
  { stat: "OFFLINE", label: "Store & Forward Local Sync", icon: WifiOff, sub: "Works Without Power" },
];

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onDismiss,
  registeredCount = 14,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[200] bg-[#F4F2EC] dark:bg-slate-950 text-[#101216] dark:text-slate-100 flex flex-col justify-between items-center p-5 sm:p-8 select-none overflow-y-auto antialiased"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_15%,rgba(30,77,64,0.08),transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_15%,rgba(16,185,129,0.12),transparent_70%)]" />

      <div className="w-full max-w-md flex justify-between items-center shrink-0 z-10 pt-1">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1E4D40]/10 text-[#1E4D40] dark:bg-emerald-950/80 dark:text-emerald-300 text-xs font-bold border border-[#1E4D40]/20 shadow-xs"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4BB055] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4BB055]" />
          </span>
          <span className="font-mono tracking-wider text-[11px] uppercase">AERA System Active</span>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          onClick={onDismiss}
          className="p-2.5 rounded-full hover:bg-[#1E4D40]/10 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all touch-manipulation active:scale-95"
          aria-label="Close splash screen"
        >
          <X size={20} />
        </motion.button>
      </div>

      <div className="flex flex-col items-center text-center my-auto w-full max-w-md space-y-5 py-4 z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 14 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-22 h-22 sm:w-26 sm:h-26 flex items-center justify-center my-1 group"
        >
          <div className="absolute inset-0 rounded-full bg-[#1E4D40]/15 dark:bg-emerald-500/20 blur-xl scale-125 transition-all duration-700 group-hover:scale-150" />
          <svg
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-lg relative z-10 transform transition-transform duration-500 hover:scale-105"
          >
            <defs>
              <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E4D40" />
                <stop offset="50%" stopColor="#2E6252" />
                <stop offset="100%" stopColor="#15362E" />
              </linearGradient>
              <linearGradient id="swooshGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7CC344" />
                <stop offset="50%" stopColor="#4BB055" />
                <stop offset="100%" stopColor="#2E8047" />
              </linearGradient>
              <filter id="shadowFilter" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#1E4D40" floodOpacity="0.25" />
              </filter>
            </defs>
            <path
              d="M100 22 C135 22, 160 38, 160 85 C160 132, 125 168, 100 178 C75 168, 40 132, 40 85 C40 38, 65 22, 100 22 Z"
              fill="url(#shieldGrad)"
              filter="url(#shadowFilter)"
            />
            <path
              d="M100 32 C128 32, 148 46, 148 85 C148 124, 120 154, 100 163 C80 154, 52 124, 52 85 C52 46, 72 32, 100 32 Z"
              fill="none"
              stroke="#4BB055"
              strokeWidth="3.5"
              strokeOpacity="0.75"
            />
            <path
              d="M62 108 L84 82 C88 78, 92 78, 96 82 L108 96 L122 74 C126 68, 132 68, 136 74 L146 90"
              fill="none"
              stroke="#E2F1E5"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M32 106 C30 78, 62 50, 115 42 C160 35, 178 58, 162 82 C146 106, 88 132, 42 122 C34 120, 28 114, 32 106 Z"
              fill="url(#swooshGrad)"
              className="drop-shadow-sm"
            />
            <path
              d="M40 102 C55 68, 110 48, 152 54 C164 56, 162 70, 148 86 C128 108, 80 124, 46 114"
              fill="none"
              stroke="#A3E635"
              strokeWidth="2.5"
              strokeOpacity="0.8"
            />
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12 }}
          className="space-y-1.5"
        >
          <span className="inline-block font-mono text-[11px] sm:text-xs tracking-[0.25em] font-extrabold text-[#B08D3E] dark:text-amber-400 uppercase">
            AERA PLATFORM
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#16233B] dark:text-white leading-[1.08] tracking-tight">
            Communication
            <br />
            must continue.
          </h1>
          <p className="text-xs sm:text-sm font-semibold tracking-wider text-[#305854] dark:text-emerald-300 pt-0.5">
            "Mitigate • Communicate • Respond • Recover"
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.18 }}
          className="w-full bg-white/60 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-xl p-3 shadow-2xs text-center"
        >
          <div className="flex items-center justify-center gap-1.5 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-[#4BB055] animate-pulse" />
            <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-[#305854] dark:text-emerald-300 uppercase">
              LIVE EMERGENCY STATUS FLOW
            </span>
          </div>
          <div className="flex items-center justify-between px-2 font-mono text-[11px] font-extrabold text-[#16233B] dark:text-slate-200 uppercase">
            <span>PREPARE</span>
            <span className="text-[#4BB055] font-sans">→</span>
            <span>REPORT</span>
            <span className="text-[#4BB055] font-sans">→</span>
            <span>COORDINATE</span>
            <span className="text-[#4BB055] font-sans">→</span>
            <span>RECOVER</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.22 }}
          className="w-full bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-3 text-left"
        >
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <AeraLogo size={22} />
              <span className="font-extrabold text-xs tracking-widest text-[#16233B] dark:text-white">AERA</span>
            </div>
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              OPERATING MODEL
            </span>
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#B08D3E] dark:text-amber-400 uppercase">
              ONE SHARED OPERATING PICTURE
            </span>
            <p className="text-sm sm:text-base font-serif font-bold text-[#16233B] dark:text-white leading-tight mt-0.5">
              Who is safe. What is needed. What happens next.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-0.5">
            {[
              { num: '01', title: 'Prepare' },
              { num: '02', title: 'Report' },
              { num: '03', title: 'Coordinate' },
              { num: '04', title: 'Recover' },
            ].map((step) => (
              <div
                key={step.num}
                className="p-2 rounded-xl bg-[#F4F2EC] dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 flex flex-col items-start gap-1"
              >
                <span className="w-5 h-5 rounded-full bg-[#1E4D40] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                  {step.num}
                </span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="w-full space-y-2.5 pt-1">
          {STATS.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -16, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{
                  duration: 0.42,
                  delay: 0.26 + idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ scale: 1.015, x: 2 }}
                className="flex items-center justify-between px-4 py-3 bg-white/85 dark:bg-slate-900/90 border border-[#B08D3E]/70 dark:border-amber-500/50 rounded-xl shadow-xs transition-shadow hover:shadow-md"
              >
                <div className="flex items-center gap-2.5 text-left pr-2 min-w-0">
                  <div className="p-1.5 rounded-md bg-[#B08D3E]/10 dark:bg-amber-400/10 shrink-0">
                    <IconComponent size={16} className="text-[#B08D3E] dark:text-amber-400" />
                  </div>
                  <div className="min-w-0">
                    <span className="block font-mono text-[10px] sm:text-[11px] font-bold tracking-widest text-[#5B6470] dark:text-slate-300 uppercase truncate">
                      {item.label}
                    </span>
                    {item.sub && (
                      <span className="block text-[10px] text-[#305854] dark:text-emerald-400 font-medium">
                        {item.sub}
                      </span>
                    )}
                  </div>
                </div>
                <span className="font-serif font-bold text-lg sm:text-xl text-[#16233B] dark:text-emerald-400 shrink-0 pl-2">
                  {item.stat}
                </span>
              </motion.div>
            );
          })}

          <motion.div
            initial={{ opacity: 0, x: -16, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{
              duration: 0.42,
              delay: 0.26 + STATS.length * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ scale: 1.015, x: 2 }}
            className="flex items-center justify-between px-4 py-3 bg-[#1E4D40]/10 dark:bg-emerald-950/50 border border-[#1E4D40]/30 dark:border-emerald-700/60 rounded-xl shadow-xs"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-widest text-[#1E4D40] dark:text-emerald-300 uppercase">
                PEOPLE REGISTERED IN NETWORK
              </span>
            </div>
            <span className="font-serif font-bold text-lg text-[#1E4D40] dark:text-emerald-300">
              {registeredCount}
            </span>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.6 }}
        className="w-full max-w-md pt-2 shrink-0 z-10"
      >
        <button
          onClick={onDismiss}
          className="group w-full py-4 px-6 bg-[#305854] dark:bg-emerald-700 hover:bg-[#234542] dark:hover:bg-emerald-600 active:scale-[0.98] text-[#F4F2EC] font-bold text-xs sm:text-sm tracking-[0.18em] rounded-xl shadow-lg transition-all touch-manipulation uppercase flex items-center justify-center gap-3"
        >
          <span>Explore AERA Platform</span>
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </button>
      </motion.div>
    </motion.div>
  );
};
